import {createRandomIdFromRangeGenerator, getRandomInteger} from './util.js';
const PICTURE_COUNT = 25;
const DESCRIPTIONS = [
  'Фото', 'Наш отель', 'На пляж', 'Лазурный берег', 'Фотограф', 'Chill',
  'Моя малышка', 'Всё, что осталось', 'Сок', 'Привет, самолёт!', 'Обувь',
  'Дорога к пляжу', 'Моя вторая малышка', 'Вкусно', 'Невкусно', 'Модник',
  'Полёт', 'Хор', 'Моя старая малышка', 'Тапки светятся', 'Пальмы',
  'Опять вкусно', 'Закат', 'Краб', 'Концерт', 'Бегемотик'
];
const USERSNAMES = ['Пользователи:','Пользователь-1', 'Пользователь-2','Пользователь-3',
  'Пользователь-4','Пользователь-5','Пользователь-6'];

const MESSAGES = ['Всё отлично!','В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];


const randomIdCommentsCreate = createRandomIdFromRangeGenerator (1, 1000000);

function createComments () {
  const Сommenter = getRandomInteger (1, USERSNAMES.length - 1);
  const randomMassage = getRandomInteger (0, MESSAGES.length - 1);
  return {
    id:randomIdCommentsCreate(),
    avatar: `img/avatar-${Сommenter}.svg`,
    message: MESSAGES[randomMassage],
    name: USERSNAMES[Сommenter]
  };
}
const randomLikesCreate = createRandomIdFromRangeGenerator (15, 200);
const randomPhotoCreate = createRandomIdFromRangeGenerator (1, PICTURE_COUNT);

function createPost () {
  const randomPhoto = randomPhotoCreate();
  return {
    id: randomPhoto,
    url: `photos/${randomPhoto}.jpg`,
    likes: randomLikesCreate(),
    description: DESCRIPTIONS[randomPhoto],
    comments:  Array.from({length: 2}, createComments)
  };
}

const createPhotos = () => Array.from({length: 25}, createPost);

export {createPhotos,DESCRIPTIONS,createComments};

