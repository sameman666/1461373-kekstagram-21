'use strict';

const fragment = document.createDocumentFragment();
const template = document.querySelector(`#picture`).content.querySelector(`a`);
const pictures = document.querySelector(`.pictures`);

const onSuccess = (data) => {
  renderPhotos(data);
  window.makeFiltration(data);
};

const renderPhotos = (data) => {
  for (let i = 0; i < data.length; i++) {
    const element = template.cloneNode(true);
    const {url, likes, comments} = data[i];
    element.querySelector(`img`).src = url;
    element.querySelector(`.picture__likes`).textContent = likes;
    element.querySelector(`.picture__comments`).textContent = comments.length;
    fragment.appendChild(element);
  }
  pictures.appendChild(fragment);
  document.querySelectorAll(`a.picture`).forEach((element, index) => element.addEventListener(`click`, () => {
    window.showBigPhoto(data[index]);
  }));
};

const onError = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style.cssText = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; position: absolute; left: 0; right: 0; font-size: 15px`;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

window.load(onSuccess, onError);

window.gallery = {
  onError,
  onSuccess,
  renderPhotos,
  fragment
};
