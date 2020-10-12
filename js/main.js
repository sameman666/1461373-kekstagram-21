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

// Открытие и закрытие изображения

const uploadFileButton = document.querySelector(`#upload-file`);
const imgEditor = document.querySelector(`.img-upload__overlay`);
const closeImgEditorButton = document.querySelector(`#upload-cancel`);


uploadFileButton.onchange = () => {
  imgEditor.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  document.addEventListener(`keydown`, onEditorEscPress);
};

const onEditorEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    if (evt.target !== hashtagInput || evt.target !== commentInput) {
      closeImgEditor();
      uploadFileButton.value = ``;
    }
  }
};

const closeImgEditor = () => {
  imgEditor.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  SCALE_VALUE = 100;
  imgEditorPreview.style.transform = `scale(${SCALE_VALUE / 100})`;
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
let SCALE_VALUE = 100;
const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 0;
const MAX_SCALE_VALUE = 100;

scaleControlSmaller.addEventListener(`click`, () => {
  if (SCALE_VALUE > MIN_SCALE_VALUE) {
    SCALE_VALUE = SCALE_VALUE - SCALE_STEP;
    imgEditorPreview.style.transform = `scale(${SCALE_VALUE / 100})`;
    scaleControlValue.value = SCALE_VALUE + `%`;
  }
});

scaleControlBigger.addEventListener(`click`, () => {
  if (SCALE_VALUE < MAX_SCALE_VALUE) {
    SCALE_VALUE = SCALE_VALUE + SCALE_STEP;
    imgEditorPreview.style.transform = `scale(${SCALE_VALUE / 100})`;
    scaleControlValue.value = SCALE_VALUE + `%`;
  }
});

// Эффекты для изображения

const effectNone = imgEditor.querySelector(`#effect-none`);
const effectChrome = imgEditor.querySelector(`#effect-chrome`);
const effectSepia = imgEditor.querySelector(`#effect-sepia`);
const effectMarvin = imgEditor.querySelector(`#effect-marvin`);
const effectPhobos = imgEditor.querySelector(`#effect-phobos`);
const effectHeat = imgEditor.querySelector(`#effect-heat`);

const applyEffect = (effect) => {
  imgEditorPreview.className = ``;
  imgEditorPreview.style.filter = ``;
  imgEditorPreview.classList.add(effect);
  effectLevel.classList.remove(`hidden`);
};

effectLevel.classList.add(`hidden`);

effectNone.addEventListener(`click`, () => {
  applyEffect(`effects__preview--none`);
  effectLevel.classList.add(`hidden`);
});

effectChrome.addEventListener(`click`, () => {
  applyEffect(`effects__preview--chrome`);
});

effectSepia.addEventListener(`click`, () => {
  applyEffect(`effects__preview--sepia`);
});

effectMarvin.addEventListener(`click`, () => {
  applyEffect(`effects__preview--marvin`);
});

effectPhobos.addEventListener(`click`, () => {
  applyEffect(`effects__preview--phobos`);
});

effectHeat.addEventListener(`click`, () => {
  applyEffect(`effects__preview--heat`);
});

const effectLevelPin = imgEditor.querySelector(`.effect-level__pin`);
const effectLevelValue = imgEditor.querySelector(`.effect-level__value`);
const EFFECT_LEVEL_MAX = 3;
const EFFECT_LEVEL_MIN = 1;

effectLevelPin.onmouseup = () => {
  effectLevelValue.value = Math.round(effectLevelPin.offsetLeft / effectLevelPin.offsetParent.offsetWidth * 100);
  if (effectChrome.checked) {
    imgEditorPreview.style.filter = ``;
    imgEditorPreview.style.filter = `grayscale(${effectLevelPin.offsetLeft / effectLevelPin.offsetParent.offsetWidth})`;
  } else if (effectSepia.checked) {
    imgEditorPreview.style.filter = ``;
    imgEditorPreview.style.filter = `sepia(${effectLevelPin.offsetLeft / effectLevelPin.offsetParent.offsetWidth})`;
  } else if (effectMarvin.checked) {
    imgEditorPreview.style.filter = ``;
    imgEditorPreview.style.filter = `invert(${effectLevelPin.offsetLeft / effectLevelPin.offsetParent.offsetWidth * 100}%)`;
  } else if (effectPhobos.checked) {
    imgEditorPreview.style.filter = ``;
    imgEditorPreview.style.filter = `blur(${effectLevelPin.offsetLeft / effectLevelPin.offsetParent.offsetWidth * EFFECT_LEVEL_MAX}px)`;
  } else if (effectHeat.checked) {
    imgEditorPreview.style.filter = ``;
    imgEditorPreview.style.filter = `brightness(${(EFFECT_LEVEL_MAX - EFFECT_LEVEL_MIN) * effectLevelPin.offsetLeft / effectLevelPin.offsetParent.offsetWidth + EFFECT_LEVEL_MIN})`;
  } else if (effectNone.checked) {
    imgEditorPreview.style.filter = ``;
  }
};

// Хэштеги

const hashtagInput = imgEditor.querySelector(`.text__hashtags`);
const commentInput = imgEditor.querySelector(`.text__description`);

hashtagInput.addEventListener(`input`, () => {
  const hashTags = hashtagInput.value.toLowerCase().trim().split(` `);
  const REG = /^#[a-zA_Zа-яА-ЯёЁ0-9]{1,19}$/;
  const keys = [];
  if (hashTags.length > 5) {
    hashtagInput.setCustomValidity(`Введите не более 5 хэштегов`);
  } else {
    for (let i = 0; i < hashTags.length; i++) {
      if (hashTags[i].length > 20) {
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
