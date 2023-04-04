import {isEscapeKey} from './util.js';
import {getData} from './fetch.js';

const COMMENTS_PORTION = 5;

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

let commentsShown = 0;
let comments = [];
const photos = await getData();

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
    document.addEventListener('keydown', onDocumentKeydown);
    renderPicture (evt);
    showCommets (evt);
  }
}

function renderPicture (evt) {
  bigPictureImg.src = evt.target.closest('.picture').querySelector('img').src;
  likesCount.textContent = evt.target.closest('.picture').querySelector('.picture__likes').textContent;
  commentsCount.textContent = evt.target.closest('.picture').querySelector('.picture__comments').textContent;
  socialCaption.textContent = photos.find((item) =>
    item.id === +evt.target.closest('.picture').dataset.pictureId).description;
  comments = photos.find((item) => item.id === +evt.target.closest('.picture').dataset.pictureId).comments;

}
function renderComment (comment) {
  const socialComment = socialCommentTamplate.cloneNode(true);
  socialComment.querySelector('img').src = comment.avatar;
  socialComment.querySelector('img').alt = comment.name;
  socialComment.querySelector('.social__text').textContent = comment.message;
  socialCommentsList.appendChild(socialComment);

  return socialComment;
}


function showCommets () {
  commentsShown += COMMENTS_PORTION;
  const lengthOfComments = comments.length;
  if (commentsShown >= lengthOfComments) {
    commentsLoader.classList.add('hidden');
    commentsShown = lengthOfComments;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = renderComment(comments[i]);
    fragment.append(commentElement);
  }
  socialCommentsList.innerHTML = '';
  socialCommentsList.append(fragment);
  commentCount.innerHTML = `${commentsShown} из ${lengthOfComments} комментариев`;

}
function closeFullPhoto () {
  bigPicture.classList.add('hidden');
  bodyNoSroll.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
}
cancelButton.addEventListener('click', closeFullPhoto);

commentsLoader.addEventListener('click',showCommets);

listMiniatures.addEventListener('click', openFullPhoto);

export {renderComment, showCommets};
