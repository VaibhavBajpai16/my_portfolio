export const AI_SERVICE = 'AI_SERVICE';

export interface AiService {
  /**
   * Generate a reply for a user message, grounded by the given system prompt.
   * Implementations should throw if the provider isn't configured or the
   * request fails — the caller is responsible for turning that into a
   * user-facing fallback.
   */
  generateReply(systemPrompt: string, userMessage: string): Promise<string>;
}
