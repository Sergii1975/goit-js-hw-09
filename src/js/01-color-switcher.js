
const dataStartEl = document.querySelector('[data-start]');
const dataStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let timerId = null;

dataStartEl.addEventListener('click', onStart);
dataStopEl.addEventListener('click', onStop);


function onStart() {
  timerId = setInterval(randomColor, 1000);
  dataStartEl.toggleAttribute('disabled');
  dataStopEl.removeAttribute('disabled');
}

function onStop() {
  clearInterval(timerId);
  dataStartEl.removeAttribute('disabled');
  dataStopEl.toggleAttribute('disabled');
}

function randomColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}