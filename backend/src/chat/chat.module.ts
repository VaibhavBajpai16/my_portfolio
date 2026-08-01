import { Module } from '@nestjs/common';
import { AiModule } from '../ai/ai.module';
import { KnowledgeModule } from '../knowledge/knowledge.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PromptService } from './prompt.service';

@Module({
  imports: [KnowledgeModule, AiModule],
  controllers: [ChatController],
  providers: [ChatService, PromptService],
})
export class ChatModule {}
