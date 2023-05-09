const taskList = document.getElementById('task-list');
const modal = document.getElementById('myModal');
const closeBtn = document.getElementsByClassName('close')[0];
const addTaskBtn = document.querySelector('button[type="submit"]');
const taskNameInput = document.getElementById('task-name');
const pomodorosInput = document.getElementById('pomodoros');
let countdown;
let timeLeft;
let timerDisplay = document.querySelector('.timer-display');
let startButton = document.querySelector('#start');
let pauseButton = document.querySelector('#pause');
let resetButton = document.querySelector('#reset');
let durationSelect = document.querySelector('#duration');
let body = document.querySelector('body');

// Open the modal when the Add Task button is clicked
function openModal() {
  modal.style.display = "block";
}

// Close the modal when the X button or outside the modal is clicked
closeBtn.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Add a new task when the form is submitted
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const taskName = taskNameInput.value.trim();
  const pomodoros = pomodorosInput.value;
  if (!taskName || !pomodoros) {
    alert('Please fill out both fields.');
    return;
  }
  const taskItem = document.createElement('li');
  taskItem.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${taskName} (${pomodoros} pomodoros)</span>
    </label>
  `;
  taskList.appendChild(taskItem);
  saveTasksToLocalStorage();
  modal.style.display = "none";
  taskNameInput.value = '';
  pomodorosInput.value = '';
});

// Load the tasks from localStorage when the page is loaded
window.addEventListener('load', function() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(function(task) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <label>
        <input type="checkbox">
        <span>${task.name} (${task.pomodoros} pomodoros)</span>
      </label>
    `;
    if (task.completed) {
      taskItem.classList.add('completed');
      taskItem.querySelector('input[type="checkbox"]').checked = true;
    }
    taskList.appendChild(taskItem);
  });
});

// Save the tasks to localStorage
function saveTasksToLocalStorage() {
  const tasks = Array.from(taskList.children).map(function(taskItem) {
    return {
      name: taskItem.querySelector('span').textContent.replace(/\s+\(\d+ pomodoros\)$/, ''),
      pomodoros: Number(taskItem.querySelector('span').textContent.match(/\d+/)[0]),
      completed: taskItem.classList.contains('completed')
    };
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a click listener to the taskList to handle completed tasks
taskList.addEventListener('click', function(e) {
  if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
    const taskItem = e.target.parentElement.parentElement;
    if (e.target.checked) {
      taskItem.classList.add('completed');
    } else {
      taskItem.classList.remove('completed');
    }
    saveTasksToLocalStorage();
  }
});

/* This is working fine
function startTimer() {
  let duration = parseInt(durationSelect.value) * 60;
  timeLeft = duration;
  clearInterval(countdown);

  countdown = setInterval(function() {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(countdown);
      body.classList.add('timer-done');
      return;
    }
  }, 1000);
}*/

function startTimer() {
  let duration = parseInt(durationSelect.value) * 60;
  let startTime = Date.now();
  let elapsedTime = 0;
  let remainingTime = duration - elapsedTime;

  countdown = setInterval(function() {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    remainingTime = duration - elapsedTime;

    if (remainingTime <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = 'Time is up!';
      body.classList.add('timer-done');
      return;
    }

    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);

  pauseButton.addEventListener('click', function() {
    clearInterval(countdown);
    remainingTime = duration - elapsedTime;
  });
  
  startButton.removeEventListener('click', startTimer);
  startButton.addEventListener('click', function() {
    startTime = Date.now() - elapsedTime * 1000;
    countdown = setInterval(function() {
      elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      remainingTime = duration - elapsedTime;
  
      if (remainingTime <= 0) {
        clearInterval(countdown);
        timerDisplay.textContent = 'Time is up!';
        body.classList.add('timer-done');
        return;
      }
  
      let minutes = Math.floor(remainingTime / 60);
      let seconds = remainingTime % 60;
      timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  });
}



function pauseTimer() {
  clearInterval(countdown);
}

function resetTimer() {
  clearInterval(countdown);
  timeLeft = parseInt(durationSelect.value) * 60;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  timerDisplay.textContent = `${minutes}:${seconds}`;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);