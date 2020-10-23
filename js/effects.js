'use strict';

(() => {
  const DEFAULT_EFFECT_VALUE = 100;
  const EFFECT_LEVEL_MAX = 3;
  const EFFECT_LEVEL_MIN = 1;
  const effectChrome = window.editor.imgEditor.querySelector(`#effect-chrome`);
  const effectSepia = window.editor.imgEditor.querySelector(`#effect-sepia`);
  const effectMarvin = window.editor.imgEditor.querySelector(`#effect-marvin`);
  const effectPhobos = window.editor.imgEditor.querySelector(`#effect-phobos`);
  const effectHeat = window.editor.imgEditor.querySelector(`#effect-heat`);
  let currentEffect = window.editor.DEFAULT_EFFECT;

  window.editor.effectLevel.classList.add(`hidden`);

  const applyEffect = (effect) => {
    applyImgFilter(``);
    setEffectValue(DEFAULT_EFFECT_VALUE);
    if (currentEffect !== window.editor.DEFAULT_EFFECT) {
      window.editor.imgEditorPreview.classList.remove(currentEffect);
    }
    if (effect !== window.editor.DEFAULT_EFFECT) {
      window.editor.imgEditorPreview.classList.add(effect);
    }
    currentEffect = effect;
    window.editor.effectLevel.classList.toggle(`hidden`, currentEffect === window.editor.DEFAULT_EFFECT);
  };
  window.applyEffect = applyEffect;

  window.editor.effectsList.addEventListener(`change`, (evt) => {
    applyEffect(`effects__preview--${evt.target.value}`);
  });

  const effectLevelPin = window.editor.imgEditor.querySelector(`.effect-level__pin`);
  const effectLevelValue = window.editor.imgEditor.querySelector(`.effect-level__value`);

  const applyImgFilter = (value) => {
    window.editor.imgEditorPreview.style.filter = value;
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
})();

