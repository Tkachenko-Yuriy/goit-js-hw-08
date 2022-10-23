import _throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formdata = {};

loadFormInput();

formEl.addEventListener('input', _throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formdata = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  formdata[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formdata));
}

function onFormSubmit(e) {
  e.preventDefault();
  e.target.reset();
  console.log(formdata);
  localStorage.removeItem(STORAGE_KEY);
}

function loadFormInput() {
  try {
    let formLoad = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!formLoad) {
      return;
    }

    formdata = formLoad;
    formEl.email.value = formdata.email || '';
    formEl.message.value = formdata.message || '';
  } catch (error) {
    console.error('Error.message ', error.message);
  }
}
