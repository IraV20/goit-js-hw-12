import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const imgList = document.querySelector('.gallery');

function templateImg(img) {
  return `<a href="${img.largeImageURL}" class="gallery-card">
          <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy"/>
    
        <ul class="desc">
          <li class="desc-text">Likes<span>${img.likes}</span></li>
          <li class="desc-text">Views<span>${img.views}</span></li>
          <li class="desc-text">Comments<span>${img.comments}</span></li>
          <li class="desc-text">Downloads<span>${img.downloads}</span></li>
        </ul></a>`;
}

export default function renderImg(images) {
  const markup = images.hits.map(image => templateImg(image)).join('');
  imgList.insertAdjacentHTML('beforeend', markup);
  let gallery = new SimpleLightbox('.gallery a', options);
  gallery.on('show.simplelightbox');
  gallery.refresh();
}

const options = {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
};
