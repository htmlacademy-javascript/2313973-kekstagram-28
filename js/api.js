import {getData} from '../js/fetch.js';
import {renderGallery} from '../js/make-miniatures.js';
import {setUserFormSubmit,onCloseUploadModal} from '../js/upload-form.js';


const data = await getData();
renderGallery(data);
setUserFormSubmit(onCloseUploadModal);
