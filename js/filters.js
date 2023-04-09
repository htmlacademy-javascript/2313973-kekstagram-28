import {renderGallery} from './make-miniatures.js';
import {photos} from './api.js';

const PICTURE_COUNT = 10;
const Filter = {
  DEFOULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED:'filter-discussed'
};

const discussedPhotosButton = document.querySelector('#filter-discussed');
const randomPhotosButton = document.querySelector('#filter-random');
const defoultPhotosButton = document.querySelector('#filter-default');
const filtersForm = document.querySelector('.img-filters__form');

let currentFilter = Filter.DEFOULT;


function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const debouncedRenderGallery = debounce(renderGallery);

function comparePhotos (photo1, photo2) {
  const rank1 = photo1.comments.length;
  const rank2 = photo2.comments.length;

  return rank2 - rank1;
}

function sortRandomly(arr){
  let j, temp;
  for(let i = arr.length - 1; i > 0; i--){
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}


filtersForm.addEventListener('click', (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  const clickedButton = evt.target;
  if (clickedButton.id === currentFilter) {
    return;
  }
  filtersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');
  currentFilter = clickedButton.id;
});

function sortDiscussedComments (pictures) {
  const copyOfArray = pictures.slice();
  const discussedCommentsArray = copyOfArray.sort(comparePhotos);
  debouncedRenderGallery(discussedCommentsArray);
}

function sortDefoultPhotos(pictures) {
  const copyOfArray = pictures.slice();
  debouncedRenderGallery(copyOfArray);
}

function sortRandomPhotos(pictures) {
  const copyOfArray = pictures.slice(0, PICTURE_COUNT);
  const newPicturesArray = sortRandomly(copyOfArray);
  debouncedRenderGallery(newPicturesArray);
}

discussedPhotosButton.addEventListener('click', (() => sortDiscussedComments(photos)));
defoultPhotosButton.addEventListener('click', (()=> sortDefoultPhotos(photos)));
randomPhotosButton.addEventListener('click', (()=> sortRandomPhotos(photos)));

