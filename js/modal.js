'use strict';

const Scale = {
  DEFAULT: 100,
  STEP: 25,
  MIN: 25,
  MAX: 100
};
const DEFAULT_EFFECT = `effects__preview--none`;
const uploadFileButton = document.querySelector(`#upload-file`);
const imgEditor = document.querySelector(`.img-upload__overlay`);
const hashtagInput = imgEditor.querySelector(`.text__hashtags`);
const commentInput = imgEditor.querySelector(`.text__description`);
const closeImgEditorButton = document.querySelector(`#upload-cancel`);
const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const main = document.querySelector(`main`);
const form = document.querySelector(`.img-upload__form`);

uploadFileButton.addEventListener(`change`, () => {
  imgEditor.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);
  document.addEventListener(`keydown`, onDocumentKeyDown);
});

const onDocumentKeyDown = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    if (evt.target !== hashtagInput && evt.target !== commentInput) {
      closeImgEditor();
    }
  }
};

const closeImgEditor = () => {
  imgEditor.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);
  scaleValue = Scale.DEFAULT;
  document.removeEventListener(`keydown`, onDocumentKeyDown);
  applySize();
  window.applyEffect(DEFAULT_EFFECT);
  hashtagInput.setCustomValidity(``);
  hashtagInput.value = ``;
  commentInput.value = ``;
  uploadFileButton.value = ``;
};

closeImgEditorButton.addEventListener(`click`, () => {
  closeImgEditor();
});

const scaleControlSmaller = imgEditor.querySelector(`.scale__control--smaller`);
const scaleControlBigger = imgEditor.querySelector(`.scale__control--bigger`);
const scaleControlValue = imgEditor.querySelector(`.scale__control--value`);
const imgEditorPreview = imgEditor.querySelector(`.img-upload__preview img`);
const effectLevel = imgEditor.querySelector(`.img-upload__effect-level`);
const effectsList = imgEditor.querySelector(`.effects__list`);
let scaleValue = Scale.DEFAULT;

const applySize = () => {
  imgEditorPreview.style.transform = `scale(${scaleValue / 100})`;
  scaleControlValue.value = scaleValue + `%`;
};

scaleControlSmaller.addEventListener(`click`, () => {
  if (scaleValue > Scale.MIN) {
    scaleValue = scaleValue - Scale.STEP;
    applySize();
  }
});

scaleControlBigger.addEventListener(`click`, () => {
  if (scaleValue < Scale.MAX) {
    scaleValue = scaleValue + Scale.STEP;
    applySize();
  }
});

const showMessage = (template) => {
  const element = template.cloneNode(true);
  main.appendChild(element);
  const closeButton = element.querySelector(`.success__button, .error__button`);

  const removeListeners = () => {
    document.removeEventListener(`keydown`, onKeyDown);
    document.removeEventListener(`click`, onDocumentClick);
  };

  closeButton.addEventListener(`click`, () => {
    main.removeChild(element);
    removeListeners();
  });

  const onKeyDown = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      main.removeChild(element);
      removeListeners();
    }
  };

  const onDocumentClick = (evt) => {
    if (evt.target === element) {
      main.removeChild(element);
      removeListeners();
    }
  };

  document.addEventListener(`keydown`, onKeyDown);
  document.addEventListener(`click`, onDocumentClick);
};

form.addEventListener(`submit`, (evt) => {
  window.load(
      () => {
        closeImgEditor();
        showMessage(successMessageTemplate);
      },
      () => {
        closeImgEditor();
        showMessage(errorMessageTemplate);
      },
      new FormData(form)
  );
  evt.preventDefault();
});

window.modal = {
  imgEditor,
  hashtagInput,
  DEFAULT_EFFECT,
  imgEditorPreview,
  effectLevel,
  effectsList
};
