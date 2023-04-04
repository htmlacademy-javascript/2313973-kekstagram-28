import {getData} from '../js/fetch.js';
import {renderGallery} from '../js/make-miniatures.js';
import {setUserFormSubmit,onCloseUploadModal} from '../js/upload-form.js';


const photos = await getData();
renderGallery(photos);

setUserFormSubmit(onCloseUploadModal);

export {photos};
