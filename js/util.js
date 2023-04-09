import {renderGallery} from './make-miniatures.js';

const ALERT_SHOW_TIME = 5000;

const messageContainer = document.createElement('div');
messageContainer.style.zIndex = '100';
messageContainer.style.position = 'absolute';
messageContainer.style.left = '0';
messageContainer.style.top = '0';
messageContainer.style.right = '0';
messageContainer.style.padding = '10px 3px';
messageContainer.style.fontSize = '30px';
messageContainer.style.color = '#ffe753';
messageContainer.style.fontFamily = '"Open Sans", "Arial", sans-serif';
messageContainer.style.textAlign = 'center';
messageContainer.style.backgroundColor = 'rgba(255, 231, 82, 0.2)';
messageContainer.classList.add('hidden');
document.body.append(messageContainer);

function showMessage(message) {
  messageContainer.classList.remove('hidden');
  messageContainer.textContent = message;
  setTimeout(() => {
    messageContainer.remove();
  }, ALERT_SHOW_TIME);
}

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const debouncedRenderGallery = debounce(renderGallery);

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

function comparePhotos (photo1, photo2) {
  const rank1 = photo1.comments.length;
  const rank2 = photo2.comments.length;

  return rank2 - rank1;
}

export {isEscapeKey,showMessage,debouncedRenderGallery,sortRandomly,comparePhotos};

