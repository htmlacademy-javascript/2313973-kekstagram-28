import {getData, sendData} from '../js/fetch.js';
import {renderGallery} from '../js/make-miniatures.js';
import {setUserFormSubmit,onCloseUploadModal} from '../js/upload-form.js';
import {showAlert} from './util.js';
import {onShowSuccessMessage,onShowErrorMessage} from '../js/messages.js';

const picturesFilters = document.querySelector('.img-filters');

let photos;

try {
  photos = await getData();
  renderGallery(photos);
  picturesFilters.classList.remove('img-filters--inactive');
} catch {
  showAlert('Не удалось загрузить данные. Попробуйте обновить страницу');
}

setUserFormSubmit(async (data) => {
  try {
    await sendData(data);
    onCloseUploadModal();
    onShowSuccessMessage();
  } catch {
    onShowErrorMessage();
  }
});

export {photos};
