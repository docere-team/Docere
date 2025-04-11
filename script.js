// Smooth scroll navigation
document.querySelectorAll('nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(target).classList.remove('hidden');
  });
});

// Simple login/register system (simulation only)
let currentUser = null;

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  // Simulate registration
  localStorage.setItem('user', JSON.stringify({ name, email }));
  alert('Registered successfully!');
  currentUser = { name, email };
  showDashboard();
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const saved = JSON.parse(localStorage.getItem('user'));

  if (saved && saved.email === email) {
    currentUser = saved;
    showDashboard();
  } else {
    alert('Invalid credentials.');
  }
});

function showDashboard() {
  document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById('dashboard').classList.remove('hidden');
  document.getElementById('welcomeUser').innerText = `Welcome, ${currentUser.name}! Keep hustling.`;
}

// Subject Tracker
document.getElementById('addTopic').addEventListener('click', () => {
  const subject = document.getElementById('subjectSelect').value;
  const topic = document.getElementById('topicInput').value;
  if (topic) {
    const list = document.getElementById('topicList');
    const item = document.createElement('li');
    item.textContent = `${subject}: ${topic}`;
    list.appendChild(item);
    document.getElementById('topicInput').value = '';
  }
});

// Book Tracker
document.getElementById('addBook').addEventListener('click', () => {
  const book = document.getElementById('bookInput').value;
  if (book) {
    const list = document.getElementById('bookList');
    const item = document.createElement('li');
    item.textContent = book;
    list.appendChild(item);
    document.getElementById('bookInput').value = '';
  }
});

// File Upload
document.getElementById('fileUpload').addEventListener('change', (e) => {
  const fileList = document.getElementById('fileList');
  for (let file of e.target.files) {
    const li = document.createElement('li');
    li.textContent = file.name;
    fileList.appendChild(li);
  }
});

// Note adding
document.getElementById('addNote').addEventListener('click', () => {
  const note = document.getElementById('noteInput').value;
  if (note) {
    const noteList = document.getElementById('noteList');
    const item = document.createElement('li');
    item.textContent = note;
    noteList.appendChild(item);
    document.getElementById('noteInput').value = '';
  }
});

// Motivation Line
document.getElementById('motivate').addEventListener('click', () => {
  const lines = [
    "You're closer than you think!",
    "One step at a time!",
    "Your future patients are counting on you!",
    "Small progress is still progress!",
    "Consistency beats perfection."
  ];
  const random = lines[Math.floor(Math.random() * lines.length)];
  document.getElementById('motivationLine').textContent = random;
});
