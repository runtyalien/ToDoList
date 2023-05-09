let countdown;
let timeLeft;
let timerDisplay = document.querySelector('.timer-display');
let startButton = document.querySelector('#start');
let pauseButton = document.querySelector('#pause');
let resetButton = document.querySelector('#reset');
let durationSelect = document.querySelector('#duration');
let body = document.querySelector('body');

function startTimer() {
  let duration = parseInt(durationSelect.value) * 60;
  timeLeft = duration;
  displayTimeLeft(duration);

  countdown = setInterval(() => {
    timeLeft--;
    displayTimeLeft(timeLeft);

    if (timeLeft === 0) {
      clearInterval(countdown);
    }
  }, 1000);

  body.classList.add('red-background');
}

function resetTimer() {
  clearInterval(countdown);
  displayTimeLeft(durationSelect.value * 60);
}

function pauseTimer(){
    clearInterval(countdown);
    body.classList.remove('red-background');
    console.log('pauseTimer');
}

function displayTimeLeft(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  let display = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  timerDisplay.textContent = display;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

