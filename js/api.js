import {getData} from '../js/fetch.js';
import {renderGallery} from '../js/make-miniatures.js';
import {setUserFormSubmit,onCloseUploadModal} from '../js/upload-form.js';

const picturesFilters = document.querySelector('.img-filters');

const photos = await getData();
picturesFilters.classList.remove('img-filters--inactive');
renderGallery(photos);


setUserFormSubmit(onCloseUploadModal);

export {photos};
