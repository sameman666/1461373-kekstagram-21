'use strict';

const photos = [];
const commentsArray = [];
const pictures = document.querySelector(`.pictures`);
const template = document.querySelector(`#picture`).content.querySelector(`a`);
const likes = template.querySelector(`.picture__likes`);
const comments = template.querySelector(`.picture__comments`);
const img = template.querySelector(`img`);

const getRandomInt = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const names = [
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

const messages = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];

const generateCommentArray = () => {
  for (let i = 0; i < 5; i++) {
    commentsArray.push(
        {
          avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
          message: messages[getRandomInt(0, messages.length - 1)],
          name: names[getRandomInt(0, names.length - 1)]
        }
    );
  }
};

generateCommentArray();

let generatePhotosArray = () => {
  for (let i = 1; i <= 25; i++) {
    photos.push(
        {
          url: `photos/${i}.jpg`,
          description: ``,
          likes: `${getRandomInt(15, 200)}`,
          comments: commentsArray[i],
        }
    );

  }
};

generatePhotosArray();

let generatePhotos = () => {
  for (let i = 0; i < 25; i++) {
    img.src = photos[i].url;
    likes.textContent = photos[i].likes;
    comments.textContent = getRandomInt(0, commentsArray.length);
    const element = template.cloneNode(true);
    pictures.appendChild(element);
  }
};

generatePhotos();
