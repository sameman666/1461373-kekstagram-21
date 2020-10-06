'use strict';

const PHOTOS_COUNT = 25;
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
const pictures = document.querySelector(`.pictures`);
const template = document.querySelector(`#picture`).content.querySelector(`a`);
const fragment = document.createDocumentFragment();
const photos = [];

const getRandomInt = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomData = (data) => {
  return data[getRandomInt(0, data.length - 1)];
};

const getRandomComments = () => {
  const comments = [];
  const commentsAmount = getRandomInt(0, 10);
  for (let i = 0; i < commentsAmount; i++) {
    comments.push(
        {
          avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
          message: getRandomData(MESSAGES),
          name: getRandomData(NAMES)
        }
    );
  }
  return comments;
};

const generatePhotosArray = () => {
  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    photos.push(
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

const generatePhotos = (data) => {
  for (let i = 0; i < data.length; i++) {
    const element = template.cloneNode(true);
    element.querySelector(`img`).src = data[i].url;
    element.querySelector(`.picture__likes`).textContent = data[i].likes;
    element.querySelector(`.picture__comments`).textContent = data[i].comments.length;
    fragment.appendChild(element);
  }
  pictures.appendChild(fragment);
};

generatePhotos(photos);

const bigPicture = document.querySelector(`.big-picture`);
const bigPictureImg = bigPicture.querySelector(`img`);
const bigPictureLikes = bigPicture.querySelector(`.likes-count`);
const bigPictureCommentsCount = bigPicture.querySelector(`.comments-count`);
const commentsList = bigPicture.querySelector(`.social__comments`);
const bigPictureComment = bigPicture.querySelector(`.social__comment`);
const commentCountBlock = bigPicture.querySelector(`.social__comment-count`);
const commentsLoader = bigPicture.querySelector(`.comments-loader`);

const showBigPhoto = (data) => {
  bigPicture.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  commentCountBlock.classList.add(`hidden`);
  commentsLoader.classList.add(`hidden`);
  bigPictureImg.src = data.url;
  bigPictureLikes.textContent = data.likes;
  bigPictureCommentsCount.textContent = data.comments.length;

  const insertComments = () => {
    for (let i = 0; i < data.comments.length; i++) {
      const newComment = bigPictureComment.cloneNode(true);
      const newCommentImg = newComment.querySelector(`img`);
      const newCommentText = newComment.querySelector(`.social__text`);
      const bigPictureDescription = bigPicture.querySelector(`.social__caption`);
      bigPictureDescription.textContent = data.description;
      newCommentImg.src = data.comments[i].avatar;
      newCommentImg.alt = data.comments[i].name;
      newCommentText.textContent = data.comments[i].message;
      fragment.appendChild(newComment);
    }
    commentsList.appendChild(fragment);
  };
  insertComments();
};

showBigPhoto(photos[0]);
