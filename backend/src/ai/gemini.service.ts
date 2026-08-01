import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiService } from './ai.service';

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

@Injectable()
export class GeminiService implements AiService {
  private readonly logger = new Logger(GeminiService.name);

  constructor(private readonly config: ConfigService) {}

  async generateReply(
    systemPrompt: string,
    userMessage: string,
  ): Promise<string> {
    const apiKey = this.config.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new ServiceUnavailableException(
        'GEMINI_API_KEY is not configured on the server.',
      );
    }

    const model =
      this.config.get<string>('GEMINI_MODEL') ?? 'gemini-flash-latest';
    const url = `${API_BASE}/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userMessage }] }],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      this.logger.error(`Gemini request failed (${response.status}): ${body}`);
      throw new ServiceUnavailableException('The AI provider request failed.');
    }

    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      this.logger.error(
        `Unexpected Gemini response shape: ${JSON.stringify(data)}`,
      );
      throw new ServiceUnavailableException(
        'The AI provider returned an empty reply.',
      );
    }

    return text;
  }
}
