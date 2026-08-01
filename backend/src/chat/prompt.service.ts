import { Injectable } from '@nestjs/common';
import { KnowledgeService } from '../knowledge/knowledge.service';

@Injectable()
export class PromptService {
  constructor(private readonly knowledge: KnowledgeService) {}

  buildSystemPrompt(): string {
    const { profile, skills, projects, experience, education } =
      this.knowledge.getAll();

    return [
      `You are the portfolio assistant for ${profile.name}, a ${profile.role}.`,
      'Answer visitor questions about their background, skills, projects, experience, and education.',
      "Only use the information below — do not invent employers, projects, or metrics that aren't listed.",
      "If something isn't covered by this data, say you don't have that information and suggest reaching out directly.",
      'Keep replies conversational and concise (a few sentences, not an essay). Speak about them in the third person.',
      '',
      '## Profile',
      JSON.stringify(profile, null, 2),
      '',
      '## Skills',
      JSON.stringify(skills, null, 2),
      '',
      '## Projects',
      JSON.stringify(projects, null, 2),
      '',
      '## Experience',
      JSON.stringify(experience, null, 2),
      '',
      '## Education',
      JSON.stringify(education, null, 2),
    ].join('\n');
  }
}
