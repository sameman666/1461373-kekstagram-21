'use strict';

(() => {
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
  const PHOTOS_COUNT = 25;
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
            description: `Описание фотографии`,
            likes: `${getRandomInt(15, 200)}`,
            comments: getRandomComments(),
          }
      );
    }
    window.data = {
      photos,
    };
  };
  generatePhotosArray();
})();