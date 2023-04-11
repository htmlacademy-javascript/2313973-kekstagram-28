import {getData} from '../js/fetch.js';
import {renderGallery} from '../js/make-miniatures.js';
import {setUserFormSubmit,onCloseUploadModal} from '../js/upload-form.js';
import {showAlert} from './util.js';

const picturesFilters = document.querySelector('.img-filters');

try {
  const photosArray = await getData();
  picturesFilters.classList.remove('img-filters--inactive');
  renderGallery(photosArray);
} catch {
  showAlert('Не удалось загрузить данные. Попробуйте обновить страницу');
}


setUserFormSubmit(onCloseUploadModal);

const photos = await getData();
export {photos};
