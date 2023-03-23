import {isEscapeKey} from './util.js';

const HASHTAG_SYMBOLS = /^#[a-za-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_TEXT_SYMBOLS = 'Хэштэг должен начинаться с # и содержать только цифры и буквы';
const HASHTAG_ERROR_TEXT_COUNT = 'Слишком большое количество хэштэгов';
const HASHTAG_ERROR_TEXT_UNIQUE = 'Хэштэги не должны повторяться';
const HASGTAG_COUNT = 5;

const downloadPicture = document.querySelector('#upload-file');
const openModal = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const uploadSupmit = document.querySelector('.img-upload__submit');

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

function isFocused () {
  return document.activeElement === hashtagField ||
  document.activeElement === commentField;
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isFocused()) {
    evt.preventDefault();
    sloseUploadModal ();
  }
}
function openUploadModal () {
  openModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

downloadPicture.addEventListener('change', openUploadModal);

function sloseUploadModal () {
  openModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
  pristine.reset();
}

uploadCancel.addEventListener('click',sloseUploadModal);

function createArray (value) {
  return value.trim().split(' ').filter((tag) => tag.trim().length);
}
function checkHasgtagSymbols (tag) {
  return HASHTAG_SYMBOLS.test(tag);
}

function isValidated (value) {
  const tags = createArray(value);
  return tags.every(checkHasgtagSymbols);
}

function checkValidCount (value) {
  const tags = createArray(value);
  return tags.length <= HASGTAG_COUNT;
}

function checkUniqueaHashtags (value) {
  const tags = createArray(value);
  const toLowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return tags.length === new Set(toLowerCaseTags).size;
}

pristine.addValidator(hashtagField,isValidated, HASHTAG_ERROR_TEXT_SYMBOLS);
pristine.addValidator(hashtagField,checkValidCount,HASHTAG_ERROR_TEXT_COUNT);
pristine.addValidator(hashtagField,checkUniqueaHashtags, HASHTAG_ERROR_TEXT_UNIQUE);

uploadSupmit.addEventListener('submit', (evt) =>
  evt.preventDefault(),
pristine.validate()
);
