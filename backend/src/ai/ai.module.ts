import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AI_SERVICE } from './ai.service';
import { GeminiService } from './gemini.service';
import { OpenaiService } from './openai.service';

@Module({
  providers: [
    GeminiService,
    OpenaiService,
    {
      provide: AI_SERVICE,
      useFactory: (
        config: ConfigService,
        gemini: GeminiService,
        openai: OpenaiService,
      ) => (config.get<string>('AI_PROVIDER') === 'openai' ? openai : gemini),
      inject: [ConfigService, GeminiService, OpenaiService],
    },
  ],
  exports: [AI_SERVICE],
})
export class AiModule {}
