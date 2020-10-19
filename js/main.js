'use strict';

const PHOTOS_COUNT = 25;
const DEFAULT_SCALE_VALUE = 100;
const DEFAULT_EFFECT_VALUE = 100;
const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const EFFECT_LEVEL_MAX = 3;
const EFFECT_LEVEL_MIN = 1;
const REG = /^#[a-zA_Zа-яА-ЯёЁ0-9]{1,19}$/;
const HASHTAG_AMOUNT_MAX = 5;
const HASHTAH_LENGTH_MAX = 20;
const DEFAULT_EFFECT = `effects__preview--none`;
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
          description: `Описание фотографии`,
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
const bigPictureCloseButton = document.querySelector(`.big-picture__cancel`);
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
  document.addEventListener(`keydown`, onBigPictureEscPress);

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
  commentsList.innerHTML = ``;
  commentsList.appendChild(fragment);
};

const closeBigPhoto = () => {
  bigPicture.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onBigPictureEscPress);
};

bigPictureCloseButton.addEventListener(`click`, () => {
  closeBigPhoto();
});

const onBigPictureEscPress = (evt) => {
  evt.preventDefault();
  if (evt.key === `Escape`) {
    closeBigPhoto();
  }
};

const addListenersToPhotos = () => {
  for (let i = 0; i < photos.length; i++) {
    document.querySelector(`[src="photos/${i + 1}.jpg"]`).addEventListener(`click`, () => {
      showBigPhoto(photos[i]);
    });
    document.querySelector(`[src="photos/${i + 1}.jpg"]`).parentNode.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        showBigPhoto(photos[i]);
      }
    });
  }
};

addListenersToPhotos();

// Открытие и закрытие изображения

const uploadFileButton = document.querySelector(`#upload-file`);
const imgEditor = document.querySelector(`.img-upload__overlay`);
const closeImgEditorButton = document.querySelector(`#upload-cancel`);


uploadFileButton.addEventListener(`change`, () => {
  imgEditor.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  document.addEventListener(`keydown`, onEditorEscPress);
});

const onEditorEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    if (evt.target !== hashtagInput && evt.target !== commentInput) {
      closeImgEditor();
    }
  }
};

const closeImgEditor = () => {
  imgEditor.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  scaleValue = DEFAULT_SCALE_VALUE;
  document.removeEventListener(`keydown`, onEditorEscPress);
  applySize();
  applyEffect(DEFAULT_EFFECT);
  hashtagInput.setCustomValidity(``);
  hashtagInput.value = ``;
  commentInput.value = ``;
  uploadFileButton.value = ``;
};

closeImgEditorButton.addEventListener(`click`, () => {
  closeImgEditor();
});

// Редактирование изображения

const scaleControlSmaller = imgEditor.querySelector(`.scale__control--smaller`);
const scaleControlBigger = imgEditor.querySelector(`.scale__control--bigger`);
const scaleControlValue = imgEditor.querySelector(`.scale__control--value`);
const imgEditorPreview = imgEditor.querySelector(`.img-upload__preview img`);
const effectLevel = imgEditor.querySelector(`.img-upload__effect-level`);
const effectsList = imgEditor.querySelector(`.effects__list`);
let scaleValue = DEFAULT_SCALE_VALUE;

const applySize = () => {
  imgEditorPreview.style.transform = `scale(${scaleValue / 100})`;
  scaleControlValue.value = scaleValue + `%`;
};

scaleControlSmaller.addEventListener(`click`, () => {
  if (scaleValue > MIN_SCALE_VALUE) {
    scaleValue = scaleValue - SCALE_STEP;
    applySize();
  }
});

scaleControlBigger.addEventListener(`click`, () => {
  if (scaleValue < MAX_SCALE_VALUE) {
    scaleValue = scaleValue + SCALE_STEP;
    applySize();
  }
});

// Эффекты для изображения

const effectChrome = imgEditor.querySelector(`#effect-chrome`);
const effectSepia = imgEditor.querySelector(`#effect-sepia`);
const effectMarvin = imgEditor.querySelector(`#effect-marvin`);
const effectPhobos = imgEditor.querySelector(`#effect-phobos`);
const effectHeat = imgEditor.querySelector(`#effect-heat`);
let currentEffect = DEFAULT_EFFECT;

effectLevel.classList.add(`hidden`);

const applyEffect = (effect) => {
  applyImgFilter(``);
  setEffectValue(DEFAULT_EFFECT_VALUE);
  if (currentEffect !== DEFAULT_EFFECT) {
    imgEditorPreview.classList.remove(currentEffect);
  }
  if (effect !== DEFAULT_EFFECT) {
    imgEditorPreview.classList.add(effect);
  }
  currentEffect = effect;
  effectLevel.classList.toggle(`hidden`, currentEffect === DEFAULT_EFFECT);
};

effectsList.addEventListener(`change`, (evt) => {
  applyEffect(`effects__preview--${evt.target.value}`);
});

const effectLevelPin = imgEditor.querySelector(`.effect-level__pin`);
const effectLevelValue = imgEditor.querySelector(`.effect-level__value`);

const applyImgFilter = (value) => {
  imgEditorPreview.style.filter = value;
};

const setEffectValue = (value) => {
  effectLevelValue.value = value;
};

effectLevelPin.addEventListener(`mouseup`, () => {
  const pinPosition = effectLevelPin.offsetLeft / effectLevelPin.offsetParent.offsetWidth;
  setEffectValue(Math.round(pinPosition * 100));
  switch (true) {
    case effectChrome.checked:
      applyImgFilter(`grayscale(${pinPosition})`);
      break;
    case effectSepia.checked:
      applyImgFilter(`sepia(${pinPosition})`);
      break;
    case effectMarvin.checked:
      applyImgFilter(`invert(${pinPosition * 100}%)`);
      break;
    case effectPhobos.checked:
      applyImgFilter(`blur(${pinPosition * EFFECT_LEVEL_MAX}px)`);
      break;
    case effectHeat.checked:
      applyImgFilter(`brightness(${(EFFECT_LEVEL_MAX - EFFECT_LEVEL_MIN) * pinPosition + EFFECT_LEVEL_MIN})`);
      break;
  }
});

// Хэштеги

const hashtagInput = imgEditor.querySelector(`.text__hashtags`);
const commentInput = imgEditor.querySelector(`.text__description`);

hashtagInput.addEventListener(`input`, () => {
  const hashTags = hashtagInput.value.toLowerCase().trim().split(` `);
  const keys = [];
  if (hashTags.length > HASHTAG_AMOUNT_MAX) {
    hashtagInput.setCustomValidity(`Введите не более 5 хэштегов`);
  } else {
    for (let i = 0; i < hashTags.length; i++) {
      if (hashTags[i].length > HASHTAH_LENGTH_MAX) {
        hashtagInput.setCustomValidity(`Длина хэштега должна быть не более 20 симв.`);
        break;
      } else if (hashTags[i] === `#`) {
        hashtagInput.setCustomValidity(`Хэштег не может состоять только из решетки`);
        break;
      } else if (hashTags[i][0] !== `#`) {
        hashtagInput.setCustomValidity(`Хэштег должен начинаться с решетки`);
        break;
      } else if (!REG.test(hashTags[i])) {
        hashtagInput.setCustomValidity(`Хэштег должен содержать только буквы и цифры`);
        break;
      } else if (keys.includes(hashTags[i])) {
        hashtagInput.setCustomValidity(`Хэштег не должен повторяться`);
        break;
      } else {
        keys.push(hashTags[i]);
        hashtagInput.setCustomValidity(``);
      }
    }
    hashtagInput.reportValidity();
  }
});
