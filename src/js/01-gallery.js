import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items.js';

const container = document.querySelector('.js-gallery');

const markup = galleryItems.map(
  ({ preview, original, description }) => `<li class="gallery__item">
    <a class="gallery__link js-target" href="${original}">
      <img
        class="gallery__image js-target"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`
);

container.insertAdjacentHTML('beforeend', markup.join(''));

const instance = new SimpleLightbox('.gallery__link');

container.addEventListener('keydown', event => {
  if (event.key === 'Escape' && instance.isOpen()) {
    instance.close();
  }
});
