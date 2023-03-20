import {isEscapeKey} from './util.js';
import { DESCRIPTIONS} from './data.js';
import {usersPhotos} from './make-miniatures.js';

const listMiniatures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const cancelButton = document.querySelector('.big-picture__cancel');
const bodyNoSroll = document.querySelector('body');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialCaption = document.querySelector('.social__caption');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCommentTamplate = socialCommentsList.querySelector('.social__comment');


function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPhoto ();
  }
}


function openFullPhoto (evt) {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    bodyNoSroll.classList.add('modal-open');
    commentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    socialCommentsList.innerHTML = '';
    renderPicture (evt);
    renderComments (evt);
  }
}
function renderPicture (evt) {
  bigPictureImg.src = evt.target.closest('.picture').querySelector('img').src;
  likesCount.textContent = evt.target.closest('.picture').querySelector('.picture__likes').textContent;
  commentsCount.textContent = evt.target.closest('.picture').querySelector('.picture__comments').textContent;
  socialCaption.textContent = DESCRIPTIONS[evt.target.closest('.picture').dataset.pictureId];
}

function renderComments (evt) {
  const picture = usersPhotos.find((item) => item.id === +evt.target.closest('.picture').dataset.pictureId);
  if (picture) {
    picture.comments.forEach(({avatar, name, message}) => {
      const socialComment = socialCommentTamplate.cloneNode(true);
      socialComment.querySelector('img').src = avatar;
      socialComment.querySelector('img').alt = name;
      socialComment.querySelector('.social__text').textContent = message;
      socialCommentsList.appendChild(socialComment);
    });
  }
}

function closeFullPhoto () {
  bigPicture.classList.add('hidden');
  bodyNoSroll.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}
cancelButton.addEventListener('click',closeFullPhoto);

listMiniatures.addEventListener('click', openFullPhoto);
