// 🎙️ Browser Speech Recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Speech Recognition not supported in this browser.");
}

const recognition = new SpeechRecognition();
recognition.lang = "en-IN";
recognition.continuous = false;
recognition.interimResults = false;

// 🎤 Start Listening (MUST be from button click)
function startListening() {
  speakText("I am listening. Please speak now.");
  recognition.start();
}

// 🎧 When speech is detected
recognition.onresult = function (event) {
  const command = event.results[0][0].transcript.toLowerCase();
  console.log("You said:", command);
  handleCommand(command);
};

// ❌ Error
recognition.onerror = function (event) {
  console.error(event.error);
  speakText("Sorry, I could not hear you clearly.");
};

// 🧠 Command Processor
function handleCommand(command) {

  // 🟢 Navigation Commands
  if (command.includes("open symptom")) {
    speakText("Opening symptom checker");
    window.location.href = "symptom.html";
  }

  else if (command.includes("open mental")) {
    speakText("Opening mental health");
    window.location.href = "mental.html";
  }

  else if (command.includes("open emergency")) {
    speakText("Opening emergency support");
    window.location.href = "emergency.html";
  }

  else if (command.includes("open fake")) {
    speakText("Opening fake health news");
    window.location.href = "myth.html";
  }

  // 🟢 Symptom Commands
  else if (command.includes("select fever")) {
    document.getElementById("fever")?.click();
    speakText("Fever selected");
  }

  else if (command.includes("select cough")) {
    document.getElementById("cough")?.click();
    speakText("Cough selected");
  }

  else if (command.includes("check risk")) {
    document.querySelector("button")?.click();
    speakText("Checking risk");
  }

  else {
    speakText("Command not recognized");
  }
}