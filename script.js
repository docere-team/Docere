const lines = [
  // Founder/Funny References
  "Founder Aftab spotted studying again — someone stop this overachiever!",
  "Legend says Aftab finished anatomy before orientation day.",
  "This app bows to its master — Dr. Aftab in the making!",
  "Even caffeine asks Aftab how he stays so energetic.",
  "If motivation was a person, it would probably take tips from Aftab.",
  "Aftab’s to-do list just called in sick.",
  "Warning: Productivity overload detected on Founder’s account.",
  "Every 7th quote makes Aftab 70% cooler — it's science.",
  "He studied so much the books asked *him* questions.",
  "App designed by Aftab. Tested on Aftab. Be like Aftab... or just pretend.",
  
  // Humorous
  "Motivation loading... buffering... ah screw it, go study.",
  "Remember, breaks are good. Just not 8 hours long.",
  "Studying is 10% reading and 90% staring at the same line.",
  "You're not procrastinating... you're pre-loading your brain.",
  "Medical school: where your dreams meet sleep deprivation.",
  "Study tip: Turn off Wi-Fi... wait, don’t. You need this app!",
  "They said 'trust the process' — the process forgot to include coffee.",
  "You vs. syllabus: Mortal Kombat edition.",
  
  // Motivational
  "Each ticked checkbox brings you closer to Dr. Aftab.",
  "Push today, relax tomorrow — or in residency!",
  "The pain of studying now is better than the pain of regret.",
  "Small wins build unstoppable momentum.",
  "A focused Aftab is scarier than examiners.",
  "Remember why you started. Then go make it worth it.",
  "Don’t study hard, study smart — but Aftab does both!",
  "You’re one step ahead of yesterday. That’s enough.",
  "Someone out there is dreaming of your seat. Own it.",
  "This isn't just effort — it’s the making of a healer.",
];

// Random quote function
function showRandomLine() {
  const line = lines[Math.floor(Math.random() * lines.length)];
  document.querySelector(".motivation-line").textContent = `"${line}"`;
}

window.onload = showRandomLine;
const popupQuotes = [
  "Founder Aftab studied so hard, his books filed for bankruptcy!",
  "Reminder: You’re already amazing. Now go finish that lecture.",
  "Motivation delivered. Courtesy: your friendly neighborhood Aftab.",
  "Don’t stop now, Aftab’s watching!",
  "Coffee: activated. Focus: 99%. Power: Unlimited.",
  "Study break? Only if you beat Aftab’s streak!",
  "You're closer to your goal than you think. Keep going!"
];

function showPopupQuote() {
  const popup = document.getElementById("quote-popup");
  const quoteText = document.getElementById("quote-text");
  const quote = popupQuotes[Math.floor(Math.random() * popupQuotes.length)];

  quoteText.textContent = quote;
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
  }, 6000); // Auto-hide after 6 seconds
}

window.onload = () => {
  showPopupQuote();
};
// Funny personalized greetings
const funnyGreetings = [
  name => `Welcome back, ${name}! Your stethoscope missed you.`,
  name => `Dr. ${name}, ready to save the world or nap first?`,
  name => `Paging Dr. ${name}... your books are judging you.`,
  name => `Hey ${name}, even caffeine believes in you today!`,
  name => `Dr. ${name}, your attendance called — it’s nervous.`,
  name => `Another day, another chapter, ${name}!`,
  name => `${name}, your brain called. It wants a snack and a nap.`,
  name => `Hello ${name}, you beautiful overachiever.`,
  name => `Warning: ${name} is too cool for anatomy today.`,
  name => `Doc ${name}, don’t forget — you signed up for this (lol).`
];

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const name = user.displayName || "Doctor";
    const randomGreeting = funnyGreetings[Math.floor(Math.random() * funnyGreetings.length)];
    document.getElementById("welcome-message").textContent = randomGreeting(name);
  } else {
    document.getElementById("welcome-message").textContent = "Welcome, future legend!";
  }
});
const subjects = [
  "Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology",
  "Microbiology", "Forensic Medicine", "Community Medicine", "Ophthalmology",
  "ENT", "Medicine", "Surgery", "Obstetrics", "Gynaecology", "Pediatrics",
  "Orthopedics", "Psychiatry", "Dermatology", "Radiology"
];

const subjectContainer = document.getElementById("subject-container");

subjects.forEach(subject => {
  const card = document.createElement("div");
  card.className = "subject-card";
  card.innerHTML = `
  <h3>${subject}</h3>

  <label>Upload Note Image:
    <input type="file" accept="image/*">
  </label><br>

  <label>Upload PDF:
    <input type="file" accept=".pdf">
  </label><br>

  <label>Important Line:
    <input type="text" placeholder="Write key quote or line here">
  </label><br>

  <label>Color Tag:
    <input type="color" onchange="tagColor(this)">
  </label><br>

  <label>Progress:
    <progress value="0" max="100"></progress>
  </label><br>

  <button onclick="markDone(this)">Mark Topic Done</button>
`;
  card.innerHTML = `
    <h3>${subject}</h3>
    <label>Upload Note Image: <input type="file" accept="image/*"></label><br>
    <label>Important Line: <input type="text" placeholder="Key point or quote"></label><br>
    <label>Progress: <progress value="0" max="100"></progress></label><br>
    <button onclick="markDone(this)">Mark Topic Done</button>
  `;
  subjectContainer.appendChild(card);
});

function markDone(btn) {
  const progress = btn.parentElement.querySelector('progress');
  let val = parseInt(progress.value);
  if (val < 100) progress.value = val + 10;
}
