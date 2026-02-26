/* =====================================================
   =============== SYMPTOM CHECKER =====================
   ===================================================== */

function checkSymptoms() {
  let score = 0;
  let selected = false;

  const symptoms = [
    "fever", "cough", "headache", "fatigue",
    "chest", "breath", "nausea", "vomit",
    "diarrhea", "chills", "cognitive", "digestive"
  ];

  const weights = {
    fever: 1, cough: 1, headache: 1, fatigue: 1,
    digestive: 2, nausea: 2, vomit: 2, diarrhea: 2, chills: 2,
    cognitive: 3, chest: 3, breath: 3
  };

  symptoms.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.checked) {
      selected = true;
      score += weights[id] || 0;
    }
  });

  const box = document.getElementById("resultBox");

  if (!selected) {
    box.style.display = "block";
    box.style.backgroundColor = "#ffe0b2";
    box.innerHTML =
      "<h3>⚠ No Symptoms Selected</h3>" +
      "<p>Please select at least one symptom to check your risk.</p>";
    return;
  }

  let resultText = "";
  let advice = "";
  let bgColor = "";

  if (score <= 3) {
    resultText = "Low Risk";
    advice = "Mild symptoms detected. Take rest, drink fluids, and monitor your health.";
    bgColor = "#c8e6c9";
  } else if (score <= 7) {
    resultText = "Medium Risk";
    advice = "Moderate symptoms detected. Avoid self-medication and consult a doctor if symptoms persist.";
    bgColor = "#fff9c4";
  } else {
    resultText = "High Risk";
    advice = "Severe symptoms detected. Please seek medical attention immediately.";
    bgColor = "#ffcdd2";
  }

  box.style.display = "block";
  box.style.backgroundColor = bgColor;
  box.innerHTML = `<h3>${resultText}</h3><p>${advice}</p>`;
}

/* =====================================================
   =========== FAKE HEALTH INFORMATION =================
   ===================================================== */

function checkMyth() {
  const msgEl = document.getElementById("msg");
  const result = document.getElementById("mythResult");
  const msg = msgEl.value.trim().toLowerCase();

  if (msg === "") {
    result.style.display = "block";
    result.style.backgroundColor = "#fff3cd";
    result.innerHTML = "<h3>⚠ Please enter a message</h3>";
    return;
  }

  const fakeWords = [
    "cow urine", "miracle cure", "100% cure",
    "no vaccine", "instant cure"
  ];

  const claimWords = [
    "used for", "reduces", "treats",
    "prevents", "controls", "heals", "relieves"
  ];

  const isFake = fakeWords.some(word => msg.includes(word));
  const isClaim = claimWords.some(word => msg.includes(word));

  result.style.display = "block";

  if (isFake) {
    result.style.backgroundColor = "#f8d7da";
    result.innerHTML =
      "<h3>❌ Fake Health Information</h3>" +
      "<p>This claim is false and unsafe.</p>";
  } else if (isClaim) {
    result.style.backgroundColor = "#fff3cd";
    result.innerHTML =
      "<h3>⚠ Misleading Health Claim</h3>" +
      "<p>This information is not medically verified.</p>";
  } else {
    result.style.backgroundColor = "#d4edda";
    result.innerHTML =
      "<h3>ℹ Needs Medical Verification</h3>" +
      "<p>Please consult trusted medical sources.</p>";
  }
}

function clearMyth() {
  document.getElementById("msg").value = "";
  document.getElementById("mythResult").style.display = "none";
}

/* ================= MENTAL HEALTH ================= */
var selectedAge = "";
var questionList = [];
var currentIndex = 0;
var mentalScore = 0;

function startMental() {
  selectedAge = document.getElementById("age_ans").value;
  if (selectedAge === "") {
    alert("Please select age group");
    return;
  }

  document.getElementById("ageBox").style.display = "none";

  questionList = Array.from(
    document.querySelectorAll('[data-age="' + selectedAge + '"]')
  );

  currentIndex = 0;
  mentalScore = 0;
  questionList[0].style.display = "block";
}

function nextMental() {
  var q = questionList[currentIndex];
  var value = parseInt(q.querySelector("select").value, 10);

  mentalScore += value;
  q.style.display = "none";
  currentIndex++;

  if (currentIndex < questionList.length) {
    questionList[currentIndex].style.display = "block";
  } else {
    showMentalResult();
  }
}

function showMentalResult() {
  var level = "";
  var color = "";
  var tips = "";

  if (mentalScore <= 10) {
    level = "Minimal Stress";
    color = "#c8e6c9";
  } else if (mentalScore <= 20) {
    level = "Mild Stress";
    color = "#fff9c4";
  } else if (mentalScore <= 30) {
    level = "Moderate Stress";
    color = "#ffe0b2";
  } else {
    level = "High Stress";
    color = "#ffcdd2";
  }

  if (selectedAge === "teen") {
    tips = "<ul><li>Limit screen time</li><li>Talk to parents</li><li>Sleep well</li><li>Play sports</li><li>Study with breaks</li><li>Stay positive</li></ul>";
  } else if (selectedAge === "adult") {
    tips = "<ul><li>Maintain work-life balance</li><li>Take breaks</li><li>Exercise</li><li>Meditate</li><li>Spend family time</li><li>Seek support</li></ul>";
  } else {
    tips = "<ul><li>Stay socially active</li><li>Health checkups</li><li>Light exercise</li><li>Share feelings</li><li>Avoid isolation</li><li>Seek help if needed</li></ul>";
  }

  var box = document.getElementById("mentalResult");
  box.style.display = "block";
  box.style.backgroundColor = color;
  box.innerHTML =
    "<h3>Result:</h3>" +
    "<h3>" + level + "</h3>" +
    "<p>Recommended Actions:</p>" +
    tips;
}

/* ============= EMERGENCY – WHATSAPP LOCATION ============= */

const waBtn = document.getElementById("whatsappHelpBtn");
const waStatus = document.getElementById("waStatus");

if (waBtn) {
  waBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      waStatus.textContent = "Location not supported on this device.";
      return;
    }

    waStatus.textContent = "Fetching location, please wait...";

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lon = pos.coords.longitude.toFixed(6);
        const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;

        const extraInput = document.getElementById("customLocation");
        const extra = extraInput && extraInput.value
          ? `\nDetails: ${extraInput.value}`
          : "";

        const message = encodeURIComponent(
          `EMERGENCY! I need help.\nMy location: ${mapsUrl}${extra}`
        );

        const phone = ""; // optional: 91xxxxxxxxxx
        const waUrl = `https://wa.me/${phone}?text=${message}`;
        window.open(waUrl, "_blank");
        waStatus.textContent = "";
      },
      () => {
        waStatus.textContent = "Unable to get location. Check GPS permission.";
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}