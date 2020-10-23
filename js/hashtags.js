'use strict';

(() => {
  const REG = /^#[a-zA_Zа-яА-ЯёЁ0-9]{1,19}$/;
  const HASHTAG_AMOUNT_MAX = 5;
  const HASHTAH_LENGTH_MAX = 20;
  window.editor.hashtagInput.addEventListener(`input`, () => {
    const hashTags = window.editor.hashtagInput.value.toLowerCase().trim().split(` `);
    const keys = [];
    if (hashTags.length > HASHTAG_AMOUNT_MAX) {
      window.editor.hashtagInput.setCustomValidity(`Введите не более 5 хэштегов`);
    } else {
      for (let i = 0; i < hashTags.length; i++) {
        if (hashTags[i].length > HASHTAH_LENGTH_MAX) {
          window.editor.hashtagInput.setCustomValidity(`Длина хэштега должна быть не более 20 симв.`);
          break;
        } else if (hashTags[i] === `#`) {
          window.editor.hashtagInput.setCustomValidity(`Хэштег не может состоять только из решетки`);
          break;
        } else if (hashTags[i][0] !== `#`) {
          window.editor.hashtagInput.setCustomValidity(`Хэштег должен начинаться с решетки`);
          break;
        } else if (!REG.test(hashTags[i])) {
          window.editor.hashtagInput.setCustomValidity(`Хэштег должен содержать только буквы и цифры`);
          break;
        } else if (keys.includes(hashTags[i])) {
          window.editor.hashtagInput.setCustomValidity(`Хэштег не должен повторяться`);
          break;
        } else {
          keys.push(hashTags[i]);
          window.editor.hashtagInput.setCustomValidity(``);
        }
      }
      window.editor.hashtagInput.reportValidity();
    }
  });
})();
