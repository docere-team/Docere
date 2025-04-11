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
    updateSubjectUI();
  });
};

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
