import {createPhotos} from './data.js';

const usersPhotos = createPhotos();
const picturesList = document.querySelector('.pictures');
const usersPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const picturesListFragment = document.createDocumentFragment();

usersPhotos.forEach(({url,likes,comments,}) => {
  const usersPicture = usersPictureTemplate.cloneNode(true);
  usersPicture.querySelector('.picture__img').src = url;
  usersPicture.querySelector('.picture__likes').textContent = likes;
  usersPicture.querySelector('.picture__comments').textContent = comments.length;
  picturesListFragment.appendChild(usersPicture);
});

picturesList.appendChild(picturesListFragment);


export {picturesList,usersPhotos};

