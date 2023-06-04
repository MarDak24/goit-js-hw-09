import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(storageFormData, 500));
form.addEventListener('submit', onFormSubmit);

reloadPage();

function storageFormData(e) {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (form.email.value === '' || form.message.value === '') {
    return alert('Будь ласка, заповніть всі поля!');
  }

  console.log({ email: form.email.value, message: form.message.value });

  form.reset();
  localStorage.removeItem(LOCAL_KEY);
  formData = {};
}

function reloadPage() {
  if (formData) {
    form.email.value = formData.email || '';
    form.message.value = formData.message || '';
  }
}
