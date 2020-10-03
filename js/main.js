'use strict';

const PHOTOS = [];
const pictures = document.querySelector(`.pictures`);
const template = document.querySelector(`#picture`).content.querySelector(`a`);

const getRandomInt = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomData = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

const NAMES = [
  `Максим`,
  `Тарас`,
  `Чингиз`,
  `Зигмунд`,
  `Никита`,
  `Андрей`,
  `Исай`,
  `Самуил`,
  `Валерий`,
  `Роберт`,
];

const MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];

const getRandomComments = () => {
  const COMMENTS = [];
  for (let i = 0; i < getRandomInt(0, 10); i++) {
    COMMENTS.push(
        {
          avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
          message: getRandomData(MESSAGES),
          name: getRandomData(NAMES)
        }
    );
  }
  return COMMENTS;
};

const generatePhotosArray = () => {
  for (let i = 1; i <= 25; i++) {
    PHOTOS.push(
        {
          url: `photos/${i}.jpg`,
          description: ``,
          likes: `${getRandomInt(15, 200)}`,
          comments: getRandomComments(),
        }
    );

  }
};

generatePhotosArray();

const fragment = document.createDocumentFragment();

const generatePhotos = () => {
  for (let i = 0; i < 25; i++) {
    const element = template.cloneNode(true);
    element.querySelector(`img`).src = PHOTOS[i].url;
    element.querySelector(`.picture__likes`).textContent = PHOTOS[i].likes;
    element.querySelector(`.picture__comments`).textContent = PHOTOS[i].comments.length;
    fragment.appendChild(element);
  }

  pictures.appendChild(fragment);
};

generatePhotos();
