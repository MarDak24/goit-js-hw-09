import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.body.style.backgroundColor = '#f7eff4';
const form = document.querySelector('form.form');
const options = {
  position: 'center-bottom',
  distance: '15px',
  borderRadius: '15px',
  timeout: 10000,
  clickToClose: true,
  cssAnimationStyle: 'from-right',
};

form.addEventListener('submit', onPromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  createPromise(1, inputDelay)
    .then(({ position, delay }) => {
      Notify.success(
        `✅ Обіцянку ${position} виконано за ${delay} мс`,
        options
      );
    })
    .catch(({ position, delay }) => {
      Notify.failure(
        `❌ Обіцянку ${position} відхилено за ${delay} мс`,
        options
      );
    });

  for (let i = 2; i <= inputAmount; i += 1) {
    inputDelay += inputStep;

    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notify.success(
          `✅ Обіцянку ${position} виконано за ${delay} мс`,
          options
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `❌ Обіцянку ${position} відхилено за ${delay} мс`,
          options
        );
      });
  }

  e.currentTarget.reset();
}
