import {isEscapeKey } from './util.js';

const succesMessageTamplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTamplate = document.querySelector('#error').content.querySelector('.error');

function onShowSuccessMessage () {
  const newSuccessMessage = succesMessageTamplate.cloneNode(true);
  document.body.append(newSuccessMessage);
  const succesButton = newSuccessMessage.querySelector('.success__button');
  succesButton.addEventListener('click',closeSuccesMessage);
  document.addEventListener('keydown', onDocumentKeydownSuccess);
  document.addEventListener('click',onCloseOutsideSuccess);
}

function onShowErrorMessage () {
  const newErrorMessage = errorMessageTamplate.cloneNode(true);
  document.body.append(newErrorMessage);
  const succesButton = newErrorMessage.querySelector('.error__button');
  succesButton.addEventListener('click',closeErrorMessage);
  document.addEventListener('keydown', onDocumentKeydownError);
  document.addEventListener('click',onCloseOutsideError);
}

function closeSuccesMessage () {
  const newSuccessMessage = document.querySelector('.success');
  newSuccessMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydownSuccess);
  document.removeEventListener('click',onCloseOutsideSuccess);
}

function closeErrorMessage () {
  const newErrorMessage = document.querySelector('.error');
  newErrorMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydownError);
  document.removeEventListener('click',onCloseOutsideError);
}

function onCloseOutsideSuccess (evt) {
  if(!evt.target.matches('.success__inner')) {
    closeSuccesMessage ();
  }
}
function onCloseOutsideError (evt) {
  if (!evt.target.closest('.error__inner')) {
    closeErrorMessage ();
  }
}

function onDocumentKeydownSuccess (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccesMessage();
  }
}

function onDocumentKeydownError (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage ();
  }
}


export {onShowSuccessMessage, onShowErrorMessage};
