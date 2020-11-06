'use strict';

const RANDOM_PHOTOS_AMOUNT = 10;
const imgFilters = document.querySelector(`.img-filters`);
const randomPhotosButton = imgFilters.querySelector(`#filter-random`);
const discussedPhotosButton = imgFilters.querySelector(`#filter-discussed`);
const defaultPhotosButton = imgFilters.querySelector(`#filter-default`);

const getRandomElement = (data) => {
  const randomElementIndex = Math.floor(Math.random() * data.length);
  return data[randomElementIndex];
};

const makeFiltration = (photos) => {
  imgFilters.classList.remove(`img-filters--inactive`);

  const changeActiveButton = (button) => {
    imgFilters.querySelector(`.img-filters__button--active`).classList.remove(`img-filters__button--active`);
    button.classList.add(`img-filters__button--active`);
  };

  const renderNewPhotos = (newPhotos) => {
    document.querySelectorAll(`a.picture`).forEach((element) => element.remove());
    window.gallery.renderPhotos(newPhotos);
  };

  let lastTimeout;

  const debounce = (data) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      renderNewPhotos(data);
    }, 500);
  };

  randomPhotosButton.addEventListener(`click`, () => {
    changeActiveButton(randomPhotosButton);
    const randomPhotos = [];
    while (randomPhotos.length < RANDOM_PHOTOS_AMOUNT) {
      const randomPhoto = getRandomElement(photos);
      if (!randomPhotos.includes(randomPhoto)) {
        randomPhotos.push(randomPhoto);
      }
    }
    debounce(randomPhotos);
  });

  discussedPhotosButton.addEventListener(`click`, () => {
    changeActiveButton(discussedPhotosButton);
    const sortedPhotos = photos.slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
    debounce(sortedPhotos);
  });

  defaultPhotosButton.addEventListener(`click`, () => {
    changeActiveButton(defaultPhotosButton);
    debounce(photos);
  });
};

window.filter = makeFiltration;
