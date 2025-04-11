let userID = null;

auth.onAuthStateChanged((user) => {
  if (user) {
    userID = user.uid;
    loadData();
  } else {
    userID = null;
    alert("Please log in to access your subjects.");
  }
});

function signUp() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => alert("Signed Up!"))
    .catch(err => alert(err.message));
}

function logIn() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => alert("Logged In!"))
    .catch(err => alert(err.message));
}

function logOut() {
  auth.signOut().then(() => {
    alert("Logged out");
    location.reload();
  });
}
const subjects = [
  "Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology", "Microbiology",
  "Forensic Medicine", "Community Medicine", "ENT", "Ophthalmology", "Medicine",
  "Surgery", "Obstetrics", "Gynaecology", "Pediatrics", "Orthopedics", "Psychiatry",
  "Dermatology", "Radiology"
];

let currentSubject = null;
let subjectData = {};

window.onload = function () {
  const subjectSelect = document.getElementById("subjectSelect");
  subjects.forEach(sub => {
    const option = document.createElement("option");
    option.value = sub;
    option.textContent = sub;
    subjectSelect.appendChild(option);
  });

  subjectSelect.addEventListener("change", (e) => {
    currentSubject = e.target.value;
    if (!subjectData[currentSubject]) subjectData[currentSubject] = [];
    function updateSubjectUI() {
  document.getElementById("subjectTitle").textContent = currentSubject;
  const list = document.getElementById("topicList");
  list.innerHTML = "";

  subjectData[currentSubject].forEach((topic, i) => {
    const li = document.createElement("li");
    li.style.borderLeft = `8px solid ${topic.priority || 'gray'}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = topic.done;
    checkbox.onchange = () => toggleTopic(i);

    const text = document.createElement("span");
    text.textContent = topic.name;
    if (topic.done) text.style.textDecoration = "line-through";

    // Priority Button
    const priorityBtn = document.createElement("button");
    priorityBtn.textContent = "Priority";
    priorityBtn.onclick = () => setPriority(i);

    // Upload File
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,image/*,audio/*";
    fileInput.onchange = (e) => uploadFile(e, i);

    // View File
    const viewBtn = document.createElement("button");
    viewBtn.textContent = "View Note";
    viewBtn.onclick = () => viewFile(i);

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(priorityBtn);
    li.appendChild(fileInput);
    li.appendChild(viewBtn);

    list.appendChild(li);
  });
}

function addCustomSubject() {
  const newSub = prompt("Enter custom subject name:");
  if (newSub) {
    subjects.push(newSub);
    const option = document.createElement("option");
    option.value = newSub;
    option.textContent = newSub;
    document.getElementById("subjectSelect").appendChild(option);
  }
}

function addTopic() {
  const input = document.getElementById("topicInput");
  const topicName = input.value.trim();
  if (!topicName || !currentSubject) return;

  subjectData[currentSubject].push({ name: topicName, done: false });
  input.value = "";
  updateSubjectUI();
}

function toggleTopic(index) {
  subjectData[currentSubject][index].done = !subjectData[currentSubject][index].done;
  updateSubjectUI();
}

function updateSubjectUI() {
  document.getElementById("subjectTitle").textContent = currentSubject;
  const list = document.getElementById("topicList");
  list.innerHTML = "";

  subjectData[currentSubject].forEach((topic, i) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = topic.done;
    checkbox.onchange = () => toggleTopic(i);

    const text = document.createElement("span");
    text.textContent = topic.name;
    if (topic.done) text.style.textDecoration = "line-through";

    li.appendChild(checkbox);
    li.appendChild(text);
    list.appendChild(li);
  });
}
function setPriority(index) {
  const choice = prompt("Enter priority (high / medium / low):").toLowerCase();
  let color;
  if (choice === "high") color = "red";
  else if (choice === "medium") color = "orange";
  else if (choice === "low") color = "green";
  else color = "gray";

  subjectData[currentSubject][index].priority = color;
  updateSubjectUI();
}

function uploadFile(e, index) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    subjectData[currentSubject][index].fileData = {
      name: file.name,
      content: reader.result
    };
    alert("File uploaded!");
  };
  reader.readAsDataURL(file);
}

function viewFile(index) {
  const file = subjectData[currentSubject][index].fileData;
  if (!file) {
    alert("No file uploaded for this topic.");
    return;
  }

  const newWindow = window.open();
  newWindow.document.write(`<h2>${file.name}</h2><iframe src="${file.content}" style="width:100%; height:80vh;"></iframe>`);
}
<script>
  const firebaseConfig = {
    apiKey: "AIzaSyDP-oScHd8G5bMJqjZ15atgQjrwwjdffrg",
    authDomain: "docere-16a25.firebaseapp.com",
    projectId: "docere-16a25",
    storageBucket: "docere-16a25.appspot.com",
    messagingSenderId: "25249080743",
    appId: "1:25249080743:web:xxxx"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();
</script>
