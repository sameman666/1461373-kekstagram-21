'use strict';

const DEFAULT_EFFECT_VALUE = 100;
const EFFECT_LEVEL_MAX = 3;
const EFFECT_LEVEL_MIN = 1;
const effectChrome = window.modal.imgEditor.querySelector(`#effect-chrome`);
const effectSepia = window.modal.imgEditor.querySelector(`#effect-sepia`);
const effectMarvin = window.modal.imgEditor.querySelector(`#effect-marvin`);
const effectPhobos = window.modal.imgEditor.querySelector(`#effect-phobos`);
const effectHeat = window.modal.imgEditor.querySelector(`#effect-heat`);
const effectLevelBar = window.modal.imgEditor.querySelector(`.effect-level__line`);
const effectLevelDepth = window.modal.imgEditor.querySelector(`.effect-level__depth`);
let currentEffect = window.modal.DEFAULT_EFFECT;

window.modal.effectLevel.classList.add(`hidden`);

const applyEffect = (effect) => {
  applyImgFilter(``);
  setEffectValue(DEFAULT_EFFECT_VALUE);
  setEffectPinPosition(DEFAULT_EFFECT_VALUE);
  if (currentEffect !== window.modal.DEFAULT_EFFECT) {
    window.modal.imgEditorPreview.classList.remove(currentEffect);
  }
  if (effect !== window.modal.DEFAULT_EFFECT) {
    window.modal.imgEditorPreview.classList.add(effect);
  }
  currentEffect = effect;
  window.modal.effectLevel.classList.toggle(`hidden`, currentEffect === window.modal.DEFAULT_EFFECT);
};

window.modal.effectsList.addEventListener(`change`, (evt) => {
  applyEffect(`effects__preview--${evt.target.value}`);
});

const effectLevelPin = window.modal.imgEditor.querySelector(`.effect-level__pin`);
const effectLevelValue = window.modal.imgEditor.querySelector(`.effect-level__value`);

const applyImgFilter = (value) => {
  window.modal.imgEditorPreview.style.filter = value;
};

const setEffectValue = (value) => {
  effectLevelValue.value = value;
};

const getPinOffsetOfInPercent = (value) => {
  const valueInRange = Math.min(effectLevelBar.offsetWidth, Math.max(0, value));
  return valueInRange * 100 / effectLevelBar.offsetWidth;
};

const setEffectPinPosition = (position) => {
  effectLevelPin.style.left = position + `%`;
  effectLevelDepth.style.width = position + `%`;
};

effectLevelPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startPosition = evt.clientX;

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = startPosition - moveEvt.clientX;
    const newPosition = effectLevelPin.offsetLeft - shift;
    const newOffset = getPinOffsetOfInPercent(newPosition);
    setEffectPinPosition(newOffset);
    startPosition = moveEvt.clientX;

    setEffectValue(Math.round(newOffset));
    switch (true) {
      case effectChrome.checked:
        applyImgFilter(`grayscale(${newOffset / 100})`);
        break;
      case effectSepia.checked:
        applyImgFilter(`sepia(${newOffset / 100})`);
        break;
      case effectMarvin.checked:
        applyImgFilter(`invert(${newOffset}%)`);
        break;
      case effectPhobos.checked:
        applyImgFilter(`blur(${newOffset / 100 * EFFECT_LEVEL_MAX}px)`);
        break;
      case effectHeat.checked:
        applyImgFilter(`brightness(${(EFFECT_LEVEL_MAX - EFFECT_LEVEL_MIN) * newOffset / 100 + EFFECT_LEVEL_MIN})`);
        break;
    }
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

window.applyEffect = applyEffect;
