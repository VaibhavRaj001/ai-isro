export async function fetchAIResponse(message: string) {
  const response = await fetch("https://confident-grace-production.up.railway.app/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch AI response");
  }

  const data = await response.json();
  return data.messages?.find((m: any) => m.role === "system")?.content ?? "No response.";
}
