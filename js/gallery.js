'use strict';

(() => {
  const fragment = document.createDocumentFragment();
  window.fragment = fragment;
  const template = document.querySelector(`#picture`).content.querySelector(`a`);
  const pictures = document.querySelector(`.pictures`);
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
  generatePhotos(window.data.photos);
})();

