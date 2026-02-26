/* ================== SPEAK ================== */
// 🎤 Speak Text Function
function speakText(text) {
  if (!('speechSynthesis' in window)) {
    alert("Sorry, your browser does not support voice assistant.");
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = localStorage.getItem("lang") || "en-IN";
  speech.rate = 1;
  speech.pitch = 1;
  speech.volume = 1;

  window.speechSynthesis.speak(speech);
}

/* ================== READ PAGE ================== */
// 🎧 Read All Page Content
function readPage() {
  let content = "";

  document.querySelectorAll("h1, h2, h3, p, label, button").forEach(el => {
    if (el.innerText.trim() !== "") {
      content += el.innerText + ". ";
    }
  });

  speakText(content);
}

/* ================== LISTEN ================== */
let recognition;
let listening = false;

// 🎙️ Start Listening
function startListening() {

  if (!('webkitSpeechRecognition' in window)) {
    alert("Voice recognition not supported. Use Chrome or Edge.");
    return;
  }

  if (listening) {
    recognition.stop();
    listening = false;
    speakText("Stopped listening");
    return;
  }

  recognition = new webkitSpeechRecognition();
  recognition.lang = localStorage.getItem("lang") || "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    listening = true;
    speakText("Listening");
    console.log("🎤 Listening...");
  };

  recognition.onerror = (event) => {
    console.error("Voice error:", event.error);
    speakText("I could not hear you");
    listening = false;
  };

  recognition.onend = () => {
    listening = false;
    console.log("🛑 Voice stopped");
  };

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log("🗣 Heard:", command);
    handleVoiceCommand(command);
  };

  recognition.start();
}

/* ================== COMMANDS ================== */
function handleVoiceCommand(command) {

  // 🔊 Reading commands
  if (command.includes("read page")) {
    readPage();
  }

  // 🔙 Navigation
  else if (command.includes("go back")) {
    speakText("Going back");
    history.back();
  }

  // 📄 Page navigation
  else if (command.includes("open symptom")) {
    speakText("Opening symptom checker");
    window.location.href = "symptom.html";
  }

  else if (command.includes("open emergency")) {
    speakText("Opening emergency support");
    window.location.href = "emergency.html";
  }

  else if (command.includes("open mental")) {
    speakText("Opening mental health assessment");
    window.location.href = "mental.html";
  }

  // ✅ Symptom selection
  else if (command.includes("select fever")) {
    document.getElementById("fever")?.click();
    speakText("Fever selected");
  }

  else if (command.includes("select cough")) {
    document.getElementById("cough")?.click();
    speakText("Cough selected");
  }

  else if (command.includes("check risk")) {
    speakText("Checking risk");
    if (typeof checkSymptoms === "function") {
      checkSymptoms();
    }
  }

  // ❌ Default
  else {
    speakText("Command not recognized");
  }
}