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
