// script.js

// Welcome & motivational lines logic
const motivationalLines = [
  "Hey Aftab, you're not just learning—you're evolving!",
  "One more topic down, Aftab, one step closer to that white coat!",
  "Aftab, if you can survive pharmac, you can survive anything!",
  "Keep going, Doctor in the making!",
  "Hey Aftab, remember: even neurons need a break sometimes!",
  "You're doing great, Aftab. Like really, med-student legend level!",
  "Study. Smile. Repeat. Aftab mode activated!",
  "Pomodoro never looked this good—keep rocking it, Aftab!",
  "What’s red and round and reminds Aftab to stay hydrated? This alert!",
  "Aftab, you + Docere = unstoppable focus!"
];

function getRandomMotivationalLine() {
  const index = Math.floor(Math.random() * motivationalLines.length);
  return motivationalLines[index];
}

function showMotivationalLine() {
  const box = document.getElementById("motivational-quote");
  if (box) box.textContent = getRandomMotivationalLine();
}

document.addEventListener("DOMContentLoaded", () => {
  showMotivationalLine();

  // Smooth scroll for navigation
  document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Smart Reminders (basic hydration timer example)
  setInterval(() => {
    alert("Hydration Check! Time to drink some water, Aftab.");
  }, 1000 * 60 * 45); // every 45 minutes

  // Pomodoro Timer basic logic (could be expanded)
  const startPomodoro = document.getElementById("startPomodoro");
  if (startPomodoro) {
    startPomodoro.addEventListener("click", () => {
      let countdown = 25 * 60;
      const display = document.getElementById("pomodoroTimer");

      const timer = setInterval(() => {
        const mins = Math.floor(countdown / 60);
        const secs = countdown % 60;
        display.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        countdown--;
        if (countdown < 0) {
          clearInterval(timer);
          alert("Pomodoro session complete, take a short break Aftab!");
        }
      }, 1000);
    });
  }
});
