import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

document.body.style.backgroundColor = '#ece5da';
const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

const startBtn = document.querySelector('[data-start-timer]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const flatpickrInput = document.querySelector('#datetime-picker');

startBtn.disabled = true;
startBtn.addEventListener('click', onStartCounter);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.failure(
        '🥺 Ой...',
        'Будь ласка, виберіть дату у майбутньому та пам\'ятайте: "Знання ґрунтується не тільки на правді, але й на помилках." - Карл Густав Юнг',
        'Ок'
      );
    } else {
      selectedDate = selectedDates[0].getTime();
      startBtn.disabled = false;
      Report.success(
        '🥰 Вітаю! Натисніть на старт!',
        '"Не намагайтеся стати успішною людиною, намагайтеся стати людиною цінною." <br/><br/>- Альберт Ейнштейн',
        'Ок'
      );
    }
  },
};

const fp = flatpickr(flatpickrInput, options);

Report.info(
  '👋 Привіт!',
  'Будь ласка, виберіть дату та натисніть на старт',
  'Ок'
);

function onStartCounter() {
  counter.start();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

const counter = {
  start() {
    intervalId = setInterval(() => {
      currentDate = Date.now();
      const deltaTime = selectedDate - currentDate;
      updateTimerface(convertMs(deltaTime));
      startBtn.disabled = true;
      flatpickrInput.disabled = true;

      if (deltaTime <= 1000) {
        this.stop();
        Report.info(
          '👏 Вітаю! Таймер зупинено!',
          'Якщо бажаєте розпочати роботу таймера, виберіть дату та натисніть на старт або перезавантажте цю сторінку',
          'Ок'
        );
      }
    }, TIMER_DELAY);
  },

  stop() {
    startBtn.disabled = true;
    flatpickrInput.disabled = false;
    clearInterval(intervalId);
    return;
  },
};

function updateTimerface({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
