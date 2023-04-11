import {photos} from './api.js';
import {debouncedRenderGallery,sortRandomly,comparePhotos} from './util.js';

const PICTURE_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED:'filter-discussed'
};

const discussedPhotosButton = document.querySelector('#filter-discussed');
const randomPhotosButton = document.querySelector('#filter-random');
const defoultPhotosButton = document.querySelector('#filter-default');
const filtersForm = document.querySelector('.img-filters__form');

let currentFilter = Filter.DEFAULT;

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

function sortDefaultPhotos(pictures) {
  const defaultPhotos = pictures.slice();
  debouncedRenderGallery(defaultPhotos);
}

function sortRandomPhotos(pictures) {
  const copyOfArray = pictures.slice(0, PICTURE_COUNT);
  const randomPicturesArray = sortRandomly(copyOfArray);
  debouncedRenderGallery(randomPicturesArray);
}

discussedPhotosButton.addEventListener('click', (() => sortDiscussedComments(photos)));
defoultPhotosButton.addEventListener('click', (()=> sortDefaultPhotos(photos)));
randomPhotosButton.addEventListener('click', (()=> sortRandomPhotos(photos)));

