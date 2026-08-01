import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiService } from './ai.service';

const API_URL = 'https://api.openai.com/v1/chat/completions';

@Injectable()
export class OpenaiService implements AiService {
  private readonly logger = new Logger(OpenaiService.name);

  constructor(private readonly config: ConfigService) {}

  async generateReply(
    systemPrompt: string,
    userMessage: string,
  ): Promise<string> {
    const apiKey = this.config.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new ServiceUnavailableException(
        'OPENAI_API_KEY is not configured on the server.',
      );
    }

    const model = this.config.get<string>('OPENAI_MODEL') ?? 'gpt-4o-mini';

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      this.logger.error(`OpenAI request failed (${response.status}): ${body}`);
      throw new ServiceUnavailableException('The AI provider request failed.');
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      this.logger.error(
        `Unexpected OpenAI response shape: ${JSON.stringify(data)}`,
      );
      throw new ServiceUnavailableException(
        'The AI provider returned an empty reply.',
      );
    }

    return text;
  }
}
