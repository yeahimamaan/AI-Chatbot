const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

// Use relative path (IMPORTANT)
const API_URL = "/api/chat";

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const userMsg = input.value.trim();
  if (!userMsg) return;

  appendMessage("You", userMsg);
  input.value = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg })
    });

    if (!res.ok) throw new Error("Network response not ok");

    const data = await res.json();
    const botReply =
      data.choices?.[0]?.message?.content || "No response.";

    appendMessage("Bot", botReply);

  } catch (err) {
    appendMessage("Bot", "Oops! Something went wrong. Try again.");
    console.error(err);
  }
}
