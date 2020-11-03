'use strict';

(() => {
  const MAX_COMMENTS_AMOUNT = 5;
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureCloseButton = document.querySelector(`.big-picture__cancel`);
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
    bigPictureImg.src = data.url;
    bigPictureLikes.textContent = data.likes;
    bigPictureCommentsCount.textContent = data.comments.length;
    document.addEventListener(`keydown`, onBigPictureEscPress);

    commentsList.innerHTML = ``;

    const renderComments = (value) => {
      const newComment = bigPictureComment.cloneNode(true);
      const newCommentImg = newComment.querySelector(`img`);
      const newCommentText = newComment.querySelector(`.social__text`);
      const bigPictureDescription = bigPicture.querySelector(`.social__caption`);
      bigPictureDescription.textContent = data.description;
      newCommentImg.src = data.comments[value].avatar;
      newCommentImg.alt = data.comments[value].name;
      newCommentText.textContent = data.comments[value].message;
      window.fragment.appendChild(newComment);
    };

    commentsLoader.classList.toggle(`hidden`, (data.comments.length <= 5));

    if (data.comments.length < MAX_COMMENTS_AMOUNT) {
      for (let i = 0; i < data.comments.length; i++) {
        renderComments(i);
      }
    } else {
      for (let i = 0; i < MAX_COMMENTS_AMOUNT; i++) {
        renderComments(i);
      }
    }
    commentsList.appendChild(window.fragment);
    let currentCommentsAmount;
    currentCommentsAmount = MAX_COMMENTS_AMOUNT;

    const addMoreComments = () => {
      if (currentCommentsAmount < data.comments.length + MAX_COMMENTS_AMOUNT) {
        let minCommentsAmount = Math.min(currentCommentsAmount + MAX_COMMENTS_AMOUNT, data.comments.length);
        for (let i = currentCommentsAmount; i < minCommentsAmount; i++) {
          renderComments(i);
          commentsList.appendChild(window.fragment);
        }
        currentCommentsAmount = currentCommentsAmount + MAX_COMMENTS_AMOUNT;
      }
    };

    window.addMoreComments = addMoreComments;
    commentsLoader.addEventListener(`click`, window.addMoreComments);
  };

  const closeBigPhoto = () => {
    bigPicture.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onBigPictureEscPress);
    commentsLoader.removeEventListener(`click`, window.addMoreComments); // Пока не знаю как удалить обработчик по другому :(
  };

  bigPictureCloseButton.addEventListener(`click`, () => {
    closeBigPhoto();
  });

  const onBigPictureEscPress = (evt) => {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      closeBigPhoto();
    }
  };

  window.preview = showBigPhoto;
})();
