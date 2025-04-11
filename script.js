// ========== Name Prompt ==========
let userName = localStorage.getItem("docereUser");
if (!userName) {
  userName = prompt("Enter your name:");
  localStorage.setItem("docereUser", userName);
}

// ========== Humorous & Motivational Quotes ==========
const humorousQuotes = [
  `Welcome Dr. ${userName}! Ready to save some neurons today?`,
  `Dr. ${userName}, you're just one coffee away from brilliance.`,
  "Coffee: because med school isn't stressful enough on its own.",
  "Brains are overrated—unless you're in neurology.",
  "Your sleep schedule is on life support.",
  "If procrastination were a subject, you'd be a topper!",
  "Eat. Study. Panic. Repeat.",
  "Docs don't cry. We just leak stress fluid.",
  "When in doubt, blame the examiner.",
  "Surgery? Nah, I operate on coffee and panic.",
  "Finals are just a suggestion, not a destination.",
  "MCQs: The only place where all options seem wrong.",
  `Dr. ${userName}, the cadaver understands more than we do!`,
  "Trust me, I'm almost a doctor (with 3 breakdowns per week).",
  "Let’s diagnose your syllabus with a terminal condition: too long.",
  "Your brain called. It’s on strike.",
  "Anatomy is fun—said no one ever.",
  `Relax Dr. ${userName}, the viva won’t eat you. Or will it?`,
  // ... more quotes continued in Part 2
];

// ========== Show Welcome Message ==========
function showWelcomeMessage() {
  const random = Math.floor(Math.random() * humorousQuotes.length);
  document.getElementById("welcome-message").innerText = humorousQuotes[random];
}

// ========== Show Pop-up Quote ==========
function showPopupQuote() {
  const random = Math.floor(Math.random() * humorousQuotes.length);
  const popup = document.getElementById("popup-quote");
  popup.innerText = humorousQuotes[random];
  popup.style.display = "block";
  setTimeout(() => popup.style.display = "none", 8000);
}

// ========== Pomodoro Logic ==========
let pomodoroTimer;
function startPomodoro() {
  const minutes = parseInt(document.getElementById("work-duration").value);
  let secondsLeft = minutes * 60;
  const display = document.getElementById("pomodoro-timer");

  clearInterval(pomodoroTimer);
  pomodoroTimer = setInterval(() => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    display.innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    if (--secondsLeft < 0) {
      clearInterval(pomodoroTimer);
      alert("Pomodoro Completed!");
      showPopupQuote();
      if (navigator.vibrate) navigator.vibrate(1000);
    }
  }, 1000);
}

// ========== Attendance Tracker ==========
function checkAttendance() {
  const theory = parseFloat(document.getElementById("theory-att").value);
  const practical = parseFloat(document.getElementById("practical-att").value);
  const ward = parseFloat(document.getElementById("ward-att").value);

  let msg = '';
  if (theory < 75) msg += "Your theory attendance is low!\n";
  if (practical < 80) msg += "Practical attendance needs improvement!\n";
  if (ward < 80) msg += "Ward duty attendance is below standard!\n";

  if (!msg) msg = "All attendance levels are good!";
  document.getElementById("attendance-msg").innerText = msg;
}

// ========== Load on Page ==========
window.onload = showWelcomeMessage;
// ========== Continue Quotes ==========
humorousQuotes.push(
  "Diagnosis: Acute Laziness. Treatment: Study.",
  "Dr. ${userName}, anatomy is just hide and seek with organs.",
  "Pathology: where diseases gossip.",
  "Pharma: Remember everything, forget nothing. Cry daily.",
  "Studying like there's no tomorrow. Exams make sure of that.",
  "Coffee and cortisol: your only true friends.",
  "Every ECG looks like a mountain range to me.",
  "Don’t worry, even real doctors Google symptoms.",
  "Dr. ${userName}, let’s write a prescription for motivation.",
  "White coat = invisible cloak of confidence (fake it).",
  "Study tip: cry a little, revise a lot.",
  "You're not alone. All med students are in this circus together.",
  "Why read Robbins when memes explain pathology better?",
  "Textbooks: heavy on knowledge, heavier on your soul.",
  "No one talks about the trauma of viva questions.",
  "If studying was a disease, I’m chronically infected.",
  "Sutures and sarcasm: every med student's tools.",
  "Don’t trust anyone who enjoys biochemistry.",
  "Being a med student is like having 99 tabs open in your brain.",
  "Histology slides: the abstract art of suffering.",
  "Med school diet: caffeine, anxiety, and hopes.",
  "Your future patients thank you for not quitting.",
  "Brain fog: the only consistent symptom.",
  "No organ system is safe from exams.",
  "Microbiology: cute names, deadly creatures.",
  "Yes, this is my natural med student look—tired and terrified.",
  "Today’s plan: survive lectures and preserve sanity.",
  "If sarcasm cured diseases, we'd all be healthy.",
  "Doctor in progress... Please wait (loading 89%).",
  "Too many books, too little time. Classic.",
  "Study like you're already on call.",
  "Clinical posting = standing with occasional panic.",
  "Viva = verbal torture with a smile.",
  "The ward smells like responsibility.",
  "Patient: I trust you, Doc. Me: *panics internally*",
  "The cadaver had more peace than my brain.",
  "Remember: MCQs are a trap. Trust no one.",
  "Reading Gray’s is like deciphering ancient scrolls.",
  "Group studies = 5% study, 95% chaos.",
  "This is not burnout, it’s just med school default mode.",
  "Dear brain, please cooperate. Exams are near.",
  "Exams bring out my inner philosopher: ‘Why am I doing this?’",
  "You can do it, Dr. ${userName}! Even if your coffee disagrees.",
  "Clinical cases are like onions... layers of confusion.",
  "If attitude could pass exams, I'd be a topper.",
  "Forget rest. Your dreams require exhaustion.",
  "Lecture notes: where handwriting goes to die.",
  "Clipboard = fake confidence amplifier.",
  "Laugh through the tears. That’s how docs roll.",
  "Too stressed to be blessed, but too passionate to stop.",
  "Every new topic = a new mountain to climb.",
  "You’ve got this, one messed-up diagram at a time.",
  "Med school: the only place where 50% is a win.",
  "Diagnosis of the day: chronic underpreparedness.",
  "Let's turn those ‘IDK’ answers into ‘MD’ ones!",
  "Study hard. You'll be the doctor who forgets nothing... hopefully.",
  "Wear your stethoscope like a crown, King/Queen.",
  "One day, you’ll look back and laugh... maybe.",
  "It’s not just a phase, it’s a lifelong commitment.",
  "If being tired was an Olympic sport, you’d medal.",
  "Study like your loans depend on it. Because they do.",
  "Your dreams are valid. Even if you look like a zombie."
);
