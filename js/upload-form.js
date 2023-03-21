import {isEscapeKey} from './util.js';

const downloadPicture = document.querySelector('#upload-file');
const openModal = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    sloseUploadModal ();
  }
}
function openUploadModal () {
  openModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

downloadPicture.addEventListener('input', openUploadModal);

function sloseUploadModal () {
  openModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

uploadCancel.addEventListener('click',sloseUploadModal);

const pristine = new Pristine (uploadForm);
const regexp = /^#[a-za-яё0-9]{1-19}$/i;
function validateHashtag (value) {
  regexp.test(value);
}

pristine.addValidator(uploadForm.querySelector('text__hashtag'),validateHashtag);


// хэш-теги разделяются пробелами;
// один и тот же хэш-тег не может быть использован дважды;
// нельзя указать больше пяти хэш-тегов;

