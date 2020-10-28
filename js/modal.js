'use strict';

(() => {
  const DEFAULT_SCALE_VALUE = 100;
  const SCALE_STEP = 25;
  const MIN_SCALE_VALUE = 25;
  const MAX_SCALE_VALUE = 100;
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

  const showSuccessMessage = () => {
    const element = successMessageTemplate.cloneNode(true);
    main.appendChild(element);
    const successMessagePopup = main.querySelector(`.success`);
    const closeButton = successMessagePopup.querySelector(`.success__button`);
    closeButton.addEventListener(`click`, () => {
      main.removeChild(element);
    });

    const onSuccessPopupEscPress = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        main.removeChild(element);
        document.removeEventListener(`keydown`, onSuccessPopupEscPress);
      }
    };

    const clickOutsidePopup = (evt) => {
      if (evt.target === successMessagePopup) {
        main.removeChild(element);
      }
    };

    document.addEventListener(`keydown`, onSuccessPopupEscPress);
    document.addEventListener(`click`, clickOutsidePopup);
  };

  const showErrorMessage = () => {
    const element = errorMessageTemplate.cloneNode(true);
    main.appendChild(element);
    const errorMessagePopup = main.querySelector(`.error`);
    const closeButton = errorMessagePopup.querySelector(`.error__button`);
    closeButton.addEventListener(`click`, () => {
      main.removeChild(element);
    });

    const onErrorPopupEscPress = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        main.removeChild(element);
        document.removeEventListener(`keydown`, onErrorPopupEscPress);
      }
    };

    const clickOutsidePopup = (evt) => {
      if (evt.target === errorMessagePopup) {
        main.removeChild(element);
      }
    };

    document.addEventListener(`keydown`, onErrorPopupEscPress);
    document.addEventListener(`click`, clickOutsidePopup);
  };

  form.addEventListener(`submit`, (evt) => {
    window.upload(new FormData(form),
        () => {
          closeImgEditor();
          showSuccessMessage();
        },
        () => {
          closeImgEditor();
          showErrorMessage();
        }
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
})();

