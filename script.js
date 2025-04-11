// ========== Section 1: Welcome Message & Humorous Quotes ==========
const userName = "Aftab"; // You can make this dynamic later with login info

const quotes = [
  `Welcome back, ${userName}! Time to outsmart your textbooks.`,
  `Dear ${userName}, even your stethoscope needs a break. Study wisely!`,
  `${userName}, legends don't cram – they plan.`,
  `Warning: ${userName} is in full doctor mode!`,
  `${userName}, even caffeine salutes your dedication.`,
  `Hello ${userName}, your books just asked for mercy.`,
  `Welcome back, ${userName}. Humor is your second stethoscope today.`,
  `Hey ${userName}, why so serious? Let’s cure some syllabus!`,
  `Good luck ${userName}, but don’t forget to breathe between flashcards.`,
  `Doctor in the making alert! Clear the wards, ${userName} is here.`,
  `Only ${userName} can juggle 19 subjects and still make memes.`,
  const quotes = [
  `Welcome back, ${userName}! Time to outsmart your textbooks.`,
  `Dear ${userName}, even your stethoscope needs a break. Study wisely!`,
  `${userName}, legends don't cram – they plan.`,
  `Warning: ${userName} is in full doctor mode!`,
  `${userName}, even caffeine salutes your dedication.`,
  `Hello ${userName}, your books just asked for mercy.`,
  `${userName}, your neurons are now 80% medical knowledge.`,
  `Books are scared when ${userName} opens them.`,
  `Welcome back, ${userName}. Humor is your second stethoscope today.`,
  `Hey ${userName}, why so serious? Let’s cure some syllabus!`,
  `Good luck ${userName}, but don’t forget to breathe between flashcards.`,
  `Doctor in the making alert! Clear the wards, ${userName} is here.`,
  `Only ${userName} can juggle 19 subjects and still make memes.`,
  `Stay hydrated, ${userName}. Knowledge doesn't come with saline.`,
  `Even AI needs a break from ${userName}'s genius.`,
  `${userName}, did you just diagnose a question paper?`,
  `If books had feelings, they’d cry when ${userName} walks in.`,
  `“Trust me, I’m almost a doctor.” – ${userName}`,
  `${userName} = caffeine + books + sarcasm + vibes.`,
  `When ${userName} studies, Google takes notes.`,
];
  `Stay hydrated, ${userName}. Knowledge doesn't come with saline.`,
];

function showWelcomeMessage() {
  const welcomeEl = document.getElementById("welcome-message");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  welcomeEl.innerHTML = `<h2>${randomQuote}</h2>`;
}

window.onload = showWelcomeMessage;

// ========== Section 2: Subject Tracker Setup ==========
const subjects = [
  "Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology", "Microbiology",
  "Forensic Medicine", "Community Medicine", "ENT", "Ophthalmology", "Medicine", "Surgery",
  "Obstetrics & Gynecology", "Pediatrics", "Psychiatry", "Dermatology", "Orthopedics",
  "Radiology", "Anesthesiology"
];

const container = document.getElementById("subject-tracker");

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

  container.appendChild(card);
});

// ========== Section 3: Supporting Functions ==========
function markDone(button) {
  const progressBar = button.parentElement.querySelector("progress");
  progressBar.value = 100;
  button.innerText = "Completed!";
  button.disabled = true;
}

function tagColor(input) {
  const card = input.closest(".subject-card");
  card.style.borderColor = input.value;
  card.style.boxShadow = `0 0 10px ${input.value}`;
}
