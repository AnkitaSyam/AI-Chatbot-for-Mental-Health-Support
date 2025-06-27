let theme = 'light';
function toggleTheme() {
  theme = theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById("logo").src = theme === 'dark'
    ? "./assets/soulbot_white.png"
    : "./assets/soulbot_black.png";
}

function addMessage(sender, text) {
  const box = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = "message " + (sender === 'user' ? 'user' : 'bot');
  div.innerText = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;
  addMessage("user", msg);
  input.value = "";

  const res = await fetch("http://127.0.0.1:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg }),
  });

  const data = await res.json();
  addMessage("bot", data.response);
}

