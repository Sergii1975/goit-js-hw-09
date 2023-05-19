import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


let getRef = selector => document.querySelector(selector);
const inputDatePickerEl = getRef('#datetime-picker');
const btnStartEl = getRef('[data-start]');
const days = getRef('[data-days]');
const hours = getRef('[data-hours]');
const minutes = getRef('[data-minutes]');
const seconds = getRef('[data-seconds]');

// Set initial value
let ms = 0;
let timerId = null;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
  }
};

btnStartEl.setAttribute('disabled', true);

flatpickr(inputDatePickerEl, options);

btnStartEl.addEventListener('click', onBtnStart);
// Reset timer on btn
window.addEventListener('keydown', event => {
  if (event.code === 'Escape' && timerId) {
    clearInterval(timerId);

    inputDatePickerEl.removeAttribute('disabled');
    btnStartEl.setAttribute('disabled', true);

    seconds.textContent = '00';
    minutes.textContent = '00';
    hours.textContent = '00';
    days.textContent = '00';
  }
});

// Start timer
function onBtnStart() {
  timerId = setInterval(startTimer, 1000);
}

//date checking and rendering of date difference
function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    btnStartEl.setAttribute('disabled', true);
    return Notiflix.Notify.failure("Please choose a date in the future");
  }

  ms = selectedDates.getTime() - currentDate;
  formatDate = convertMs(ms);

  renderDate(formatDate);
  btnStartEl.removeAttribute('disabled');
}

//Timer
function startTimer() {
  btnStartEl.setAttribute('disabled', true);
  inputDatePickerEl.setAttribute('disabled', true);

  ms -= 1000;

  if (seconds.textContent <= 0 && minutes.textContent <= 0 && hours.textContent <= 0 && days.textContent <= 0) {
    return Notiflix.Notify.info('Time end');
    clearInterval(timerId);
  } else {
    formatDate = convertMs(ms);
    renderDate(formatDate);
  }
}

// Rendering date
function renderDate(formatDate) {
  seconds.textContent = formatDate.seconds;
  minutes.textContent = formatDate.minutes;
  hours.textContent = formatDate.hours;
  days.textContent = formatDate.days;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  
  const hours = addLeadingZero((Math.floor((ms % day) / hour)));
  
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
