// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);
  document.getElementById("theme-btn").innerText = isDark ? "☀ Light Mode" : "🌙 Dark Mode";
}

// Motivational Quotes
const quotes = [
  "Believe in yourself and all that you are.",
  "Push yourself, because no one else is going to do it for you.",
  "Dream it. Wish it. Do it.",
  "Great things never come from comfort zones.",
  "Success doesn’t just find you. You have to go out and get it.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Your limitation—it’s only your imagination.",
  "Sometimes we’re tested not to show our weaknesses, but to discover our strengths."
];

function displayRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote-box").innerText = "🌟 " + quote;
}

// Tasks
function addTask() {
  const task = document.getElementById("task-input").value.trim();
  if (!task) return alert("Please enter a task!");

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("task-input").value = "";
  loadTasks();
}

function loadTasks() {
  const taskList = document.getElementById("task-list");
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  taskList.innerHTML = "";
  tasks.forEach((t, i) => {
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `${t} <button onclick="deleteTask(${i})">❌</button>`;
    taskList.appendChild(div);
  });
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// Notes
function saveNote() {
  const selectedPage = document.getElementById("note-page").value;
  const note = document.getElementById("notes").value;
  localStorage.setItem("note_" + selectedPage, note);
  alert("📝 Notes Saved!");
}

function loadNotes() {
  const selectedPage = document.getElementById("note-page").value;
  const note = localStorage.getItem("note_" + selectedPage) || "";
  document.getElementById("notes").value = note;
}

// Custom Timer
let customMinutes = 0;
let customSeconds = 0;
let customTimer;
let isPaused = false;

function updateDisplay() {
  const m = customMinutes.toString().padStart(2, '0');
  const s = customSeconds.toString().padStart(2, '0');
  document.getElementById("timer-display").innerText = `${m}:${s}`;
}

function startCustomTimer() {
  if (customTimer) return;

  if (!isPaused) {
    customMinutes = parseInt(document.getElementById("custom-min").value);
    customSeconds = parseInt(document.getElementById("custom-sec").value);
  }

  isPaused = false;

  customTimer = setInterval(() => {
    if (customMinutes === 0 && customSeconds === 0) {
      clearInterval(customTimer);
      customTimer = null;
      document.getElementById("alarmSound").play();
      alert("⏰ Time's up!");
      return;
    }

    if (customSeconds === 0) {
      customMinutes--;
      customSeconds = 59;
    } else {
      customSeconds--;
    }

    updateDisplay();
  }, 1000);

  updateDisplay();
}

function pauseTimer() {
  clearInterval(customTimer);
  customTimer = null;
  isPaused = true;
}

function resetCustomTimer() {
  clearInterval(customTimer);
  customTimer = null;
  isPaused = false;
  customMinutes = 0;
  customSeconds = 0;
  document.getElementById("custom-min").value = 0;
  document.getElementById("custom-sec").value = 0;
  updateDisplay();
}

// On Load
window.onload = () => {
  const dark = localStorage.getItem("darkMode") === "true";
  if (dark) {
    document.body.classList.add("dark-mode");
    document.getElementById("theme-btn").innerText = "☀ Light Mode";
  }
  loadTasks();
  loadNotes();
  displayRandomQuote();
};