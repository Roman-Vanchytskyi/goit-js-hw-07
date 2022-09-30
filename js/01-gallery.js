import { galleryItems } from "./gallery-items.js";
// Change code below this line

function createImage(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
    </a>
</div>`;
    })
    .join("");
}

const imageContainer = document.querySelector(".gallery");

imageContainer.insertAdjacentHTML("beforeend", createImage(galleryItems));

imageContainer.addEventListener("click", openModal);

function openModal(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  const originImageLink = evt.target.dataset.source;
  const instance = basicLightbox.create(`<img src="${originImageLink}">`, {
    onShow: () => {
      window.addEventListener("keydown", onEscKey);
    },
    onClose: () => {
      window.removeEventListener("keydown", onEscKey);
    },
  });
  instance.show();

  function onEscKey(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }
}
