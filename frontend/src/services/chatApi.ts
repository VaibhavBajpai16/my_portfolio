const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function sendChatMessage(message: string): Promise<string> {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`Chat request failed with status ${response.status}`);
  }

  const data: { reply: string } = await response.json();
  return data.reply;
}
