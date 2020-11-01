'use strict';

(() => {
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
    commentsLoader.classList.add(`hidden`);
    bigPictureImg.src = data.url;
    bigPictureLikes.textContent = data.likes;
    bigPictureCommentsCount.textContent = data.comments.length;
    document.addEventListener(`keydown`, onBigPictureEscPress);

    for (let i = 0; i < data.comments.length; i++) {
      const newComment = bigPictureComment.cloneNode(true);
      const newCommentImg = newComment.querySelector(`img`);
      const newCommentText = newComment.querySelector(`.social__text`);
      const bigPictureDescription = bigPicture.querySelector(`.social__caption`);
      bigPictureDescription.textContent = data.description;
      newCommentImg.src = data.comments[i].avatar;
      newCommentImg.alt = data.comments[i].name;
      newCommentText.textContent = data.comments[i].message;
      window.fragment.appendChild(newComment);
    }
    commentsList.innerHTML = ``;
    commentsList.appendChild(window.fragment);
  };

  const closeBigPhoto = () => {
    bigPicture.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onBigPictureEscPress);
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
