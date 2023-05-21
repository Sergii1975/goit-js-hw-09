import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const inputDatePickerEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds= document.querySelector('[data-seconds]');

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


function onBtnStart() {
  timerId = setInterval(startTimer, 1000);
}

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

function startTimer() {
  btnStartEl.setAttribute('disabled', true);
  inputDatePickerEl.setAttribute('disabled', true);

  ms -= 1000;

  if (seconds.textContent <= 0 && minutes.textContent <= 0 && hours.textContent <= 0 && days.textContent <= 0) {
   Notiflix.Notify.info('Time end');
    inputDatePickerEl.removeAttribute('disabled', true);
    clearInterval(timerId);
  } else {
    formatDate = convertMs(ms);
    renderDate(formatDate);
  }
}

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
