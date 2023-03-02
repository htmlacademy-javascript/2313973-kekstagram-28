const PICTURE_COUNT = 25;
const DESCRIPTIONS = [
  'Фото', 'Наш отель', 'На пляж', 'Лазурный берег', 'Фотограф', 'Chill',
  'Моя малышка', 'Всё, что осталось', 'Сок', 'Привет, самолёт!', 'Обувь',
  'Дорога к пляжу', 'Моя вторая малышка', 'Вкусно', 'Невкусно', 'Модник',
  'Полёт', 'Хор', 'Моя старая малышка', 'Тапки светятся', 'Пальмы',
  'Опять вкусно', 'Закат', 'Краб', 'Концерт', 'Бегемотик'
];
const USERSNAMES = ['Пользователь-1', 'Пользователь-2','Пользователь-3',
  'Пользователь-4','Пользователь-5','Пользователь-6'];

const MESSAGES = ['Всё отлично!','В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

function getRandomInteger (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomIdFromRangeGenerator (a, b) {
  const previousValues = [];
  let currentValue = getRandomInteger(a, b);
  if (previousValues.length >= (b - a + 1)) {
    return null;
  }
  while (previousValues.includes(currentValue)) {
    currentValue = getRandomInteger(a, b);
  }
  previousValues.push(currentValue);
  return currentValue;
}

function createComments () {
  const randomUser = createRandomIdFromRangeGenerator (0, USERSNAMES.length - 1);
  return {
    id:createRandomIdFromRangeGenerator (1, 1000000),
    avatar: `img/${randomUser}.svg`,
    message: MESSAGES[createRandomIdFromRangeGenerator (0, MESSAGES.length - 1)],
    name: randomUser
  };
}

function createPost () {
  const randomPhoto = createRandomIdFromRangeGenerator (1, PICTURE_COUNT);
  return {
    id: createRandomIdFromRangeGenerator (1, PICTURE_COUNT),
    url: `photos/${randomPhoto}.jpg`,
    likes: createRandomIdFromRangeGenerator (15, 200),
    description: DESCRIPTIONS[randomPhoto],
    comments:  Array.from({length: 3}, createComments)
  };
}

// eslint-disable-next-line no-unused-vars
const createPhotos = () => Array.from({length: 25}, createPost);
