'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const fileChooser = document.querySelector(`#upload-file`);
const preview = document.querySelector(`.img-upload__preview img`);

fileChooser.addEventListener(`change`, () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => {
    return fileName.endsWith(ending);
  });

  const addIcons = (src) => {
    document.querySelectorAll(`.effects__item span`).forEach((element) => {
      element.style.cssText = `background-image: url(${src})`;
    });
  };

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      preview.src = reader.result;
      addIcons(preview.src);
    });

    reader.readAsDataURL(file);
  }
});
