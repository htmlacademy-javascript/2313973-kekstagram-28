const DEFAULT_SCALE = 100;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCLALE_STEP = 25;

const photosScale = document.querySelector('.scale__control--value');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomOutButton = document.querySelector('.scale__control--smaller');
const imageElement = document.querySelector('.img-upload__preview img');

function toScaleImage (value) {
  imageElement.style.transform = `scale(${value / 100})`;
  photosScale.value = `${value}%`;
}

function onBiggerButtonClick () {
  const currentValue = parseInt(photosScale.value, 10);
  let NewValue = currentValue + SCLALE_STEP;
  if (NewValue > MAX_SCALE) {
    NewValue = MAX_SCALE;
  }
  toScaleImage(NewValue);
}

function onSmallerButtonClick () {
  const currentValue = parseInt(photosScale.value, 10);
  let newValue = currentValue - SCLALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  toScaleImage(newValue);
}

function resetScale () {
  toScaleImage(DEFAULT_SCALE);
}


zoomInButton.addEventListener('click', onBiggerButtonClick);
zoomOutButton.addEventListener('click', onSmallerButtonClick);

export {resetScale};
