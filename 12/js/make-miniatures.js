const picturesList = document.querySelector('.pictures');
const usersPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesListFragment = document.createDocumentFragment();

function renderGallery (photos) {
  photos.forEach(({url,likes,comments, id}) => {
    const usersPicture = usersPictureTemplate.cloneNode(true);
    usersPicture.querySelector('.picture__img').src = url;
    usersPicture.querySelector('.picture__likes').textContent = likes;
    usersPicture.querySelector('.picture__comments').textContent = comments.length;
    usersPicture.dataset.pictureId = id;
    picturesListFragment.appendChild(usersPicture);
  }
  );
  picturesList.querySelectorAll('.picture').forEach((picture) => picture.remove());
  picturesList.appendChild(picturesListFragment);
}


export {picturesList,renderGallery};

