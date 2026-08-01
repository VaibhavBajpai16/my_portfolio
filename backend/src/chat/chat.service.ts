import { Inject, Injectable, Logger } from '@nestjs/common';
import { AI_SERVICE } from '../ai/ai.service';
import type { AiService } from '../ai/ai.service';
import { PromptService } from './prompt.service';

const FALLBACK_REPLY =
  "I'm having trouble reaching my AI backend right now. Please try again shortly, or reach out directly through the contact section.";

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    @Inject(AI_SERVICE) private readonly ai: AiService,
    private readonly prompt: PromptService,
  ) {}

  async reply(message: string): Promise<string> {
    const systemPrompt = this.prompt.buildSystemPrompt();

    try {
      return await this.ai.generateReply(systemPrompt, message);
    } catch (error) {
      this.logger.warn(`Falling back after AI provider error: ${error}`);
      return FALLBACK_REPLY;
    }
  }
}
