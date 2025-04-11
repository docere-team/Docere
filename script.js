const humorousQuotes = [
  "Study mode activated. Brain cells, assemble!",
  "Don't worry, coffee understands you.",
  "Ward round calories: 0. Stress: max.",
  "Docere: Turning tears into degrees since day one.",
  "This is your sign to stop scrolling and start studying.",
  "Dear brain, kindly co-operate.",
  "Study hard. Sleep harder.",
  "You're not procrastinating, you're just buffering.",
  "Patient: *breathes* Interns: Panic mode activated.",
  "Study like your phone battery is at 1% and charger is far.",
  "You: 'I'll just revise this topic.' Universe: 'Lol, okay.'",
  "Medicine is 90% memorization, 10% panic.",
  "Is this syllabus or a punishment?",
  "Remember, caffeine and crying are free.",
  "Just a med student... standing in front of a textbook... begging it to make sense.",
  "Me: Opens book. Brain: Shuts down.",
  "Life hack: If you can’t convince them, confuse them.",
  "I don’t rise and shine, I caffeinate and hope.",
  "You’re doing amazing. Even if you feel like a lost neuron."
  // add more later!
];

function enterStudyMode() {
  const quoteText = document.getElementById("quoteText");
  const randomQuote = humorousQuotes[Math.floor(Math.random() * humorousQuotes.length)];

  quoteText.innerText = randomQuote;

  const popup = document.getElementById("studyPopup");
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 4000);
}
function addWardDuty() {
  const dept = document.getElementById("ward-dept").value;
  const from = document.getElementById("start-date").value;
  const to = document.getElementById("end-date").value;

  if (!dept || !from || !to) {
    alert("Please fill all fields!");
    return;
  }

  const calendar = document.getElementById("ward-calendar");
  const entry = document.createElement("div");
  entry.innerHTML = `<strong>${dept}</strong>: ${from} to ${to}`;
  entry.style.marginBottom = "8px";
  calendar.appendChild(entry);

  // Later: Save this in local storage / Firebase
}
