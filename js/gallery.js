'use strict';

(() => {
  const fragment = document.createDocumentFragment();
  window.fragment = fragment;
  const template = document.querySelector(`#picture`).content.querySelector(`a`);
  const pictures = document.querySelector(`.pictures`);

  const successHandler = (data) => {
    for (let i = 0; i < data.length; i++) {
      const element = template.cloneNode(true);
      element.querySelector(`img`).src = data[i].url;
      element.querySelector(`.picture__likes`).textContent = data[i].likes;
      element.querySelector(`.picture__comments`).textContent = data[i].comments.length;
      fragment.appendChild(element);
    }
    pictures.appendChild(fragment);
  };

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `15px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.load(successHandler, errorHandler);

  window.gallery = errorHandler;
})();

