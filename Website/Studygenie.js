const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

function sendMessage() {
  const text = input.value.trim();
  if (text === "") return;

  addMessage(text, "user-msg");
  input.value = "";

  setTimeout(() => {
    generateAIResponse(text);
  }, 500);
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/***********************
    AI RESPONSE LOGIC 
***********************/
function generateAIResponse(userText) {
  let response = "";

  const msg = userText.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi")) {
    response = "Hello! I'm StudyGenie. How can I help you study today?";
  }
  else if (msg.includes("define")) {
    response = "A definition explains the exact meaning of a word or concept. Give me a term and I’ll define it!";
  }
  else if (msg.includes("study tips") || msg.includes("tips")) {
    response = "Here are some tips: 1) Use Pomodoro. 2) Remove distractions. 3) Review notes daily. 4) Sleep properly.";
  }
  else if (msg.includes("what is")) {
    response = "Let me simplify that! ‘What is’ questions usually describe the meaning, purpose, or function of something.";
  }
  else if (msg.includes("how to")) {
    response = "To do that, break the task into smaller steps, set a timer, and stay consistent!";
  }
  else {
    response = "Great question! Here's a simple explanation: " + generateGenericAnswer(userText);
  }

  typingEffect(response);
}

function typingEffect(text) {
  let index = 0;
  let displayed = "";

  const interval = setInterval(() => {
    displayed += text.charAt(index);
    index++;

    if (index === 1) addMessage("", "ai-msg");

    const lastMsg = chatBox.lastChild;
    lastMsg.textContent = displayed;

    if (index >= text.length) clearInterval(interval);

    chatBox.scrollTop = chatBox.scrollHeight;
  }, 20);
}

/***********************
 GENERIC CATCH-ALL AI RESPONSE
***********************/
function generateGenericAnswer(input) {
  return (
    "It seems you're asking about '" +
    input +
    "'. Try breaking it down into easier parts and understanding the core idea."
  );
}