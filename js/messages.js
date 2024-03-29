import {isEscapeKey} from './util.js';

const succesMessageTamplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTamplate = document.querySelector('#error').content.querySelector('.error');
const uploadSubmitButton = document.querySelector('.img-upload__submit');
let errorMessageOpen = false;

const isErrorMessageOpen = () => errorMessageOpen === false;

function changeButtonSubmit (boolean) {
  if (boolean) {
    return uploadSubmitButton.setAttribute('disabled',true);
  }
  return uploadSubmitButton.removeAttribute('disabled');
}

function onShowSuccessMessage () {
  const newSuccessMessage = succesMessageTamplate.cloneNode(true);
  document.body.append(newSuccessMessage);
  const succesButton = newSuccessMessage.querySelector('.success__button');
  succesButton.addEventListener('click',onCloseSuccesMessage);
  document.addEventListener('keydown', onDocumentKeydownSuccess);
  document.addEventListener('click',onCloseOutsideSuccess);
}

function onShowErrorMessage () {
  const newErrorMessage = errorMessageTamplate.cloneNode(true);
  document.body.append(newErrorMessage);
  const errorButton = newErrorMessage.querySelector('.error__button');
  errorButton.addEventListener('click',onCloseErrorMessage);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.addEventListener('click',onCloseOutsideError);
  errorMessageOpen = true;
}

function onCloseSuccesMessage () {
  const newSuccessMessage = document.querySelector('.success');
  newSuccessMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydownSuccess);
  document.removeEventListener('click',onCloseOutsideSuccess);
}

function onCloseErrorMessage () {
  const newErrorMessage = document.querySelector('.error');
  newErrorMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydownError);
  document.removeEventListener('click',onCloseOutsideError);
  errorMessageOpen = false;
  changeButtonSubmit(false);
}

function onCloseOutsideSuccess (evt) {
  if(!evt.target.matches('.success__inner')) {
    onCloseSuccesMessage ();
  }
}
function onCloseOutsideError (evt) {
  if (!evt.target.closest('.error__inner')) {
    onCloseErrorMessage ();
  }
}

function onDocumentKeydownSuccess (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseSuccesMessage ();
  }
}

function onDocumentKeydownError (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseErrorMessage ();
  }
}


export {onShowSuccessMessage, onShowErrorMessage,isErrorMessageOpen, changeButtonSubmit};
