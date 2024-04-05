import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import searchImg from './js/pixabay-api';
import renderImg from './js/render-functions';
import { imgList } from './js/render-functions';

const form = document.querySelector('form');
const loader = document.querySelector('.loader');
const btnLoad = document.querySelector('.btn-load');

let userValue;
let currentPage = 1;
let maxPage = 0;
const perPage = 15;

form.addEventListener('submit', onFormSubmit);
btnLoad.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(e) {
  e.preventDefault();
  currentPage = 1;

  imgList.innerHTML = '';

  userValue = e.target.elements.search.value.trim();
  showLoader();

  const images = await searchImg(userValue, currentPage);
  maxPage = Math.ceil(images.total / perPage);

  if (images.hits.length === 0) {
    hideBtnMore();

    validImg(images);
  } else {
    renderImg(images);
    checkBtnStatus();
  }

  hideLoader();

  e.target.reset();
}

async function onLoadMoreClick() {
  currentPage += 1;

  showLoader();
  const images = await searchImg(userValue, currentPage);
  if (images.hits.length === 0) {
    hideBtnMore();
    validImg(images);
  } else {
    renderImg(images);
    myScroll();
    checkBtnStatus();
  }

  hideLoader();
}

function validImg(images) {
  iziToast.error({
    title:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
    titleColor: '#fff',
    backgroundColor: '#EF4040',
    titleSize: '16px',
    titleLineHeight: '1.5',
    close: true,
    icon: '',
  });
}

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

function showBtnMore() {
  btnLoad.classList.remove('is-hidden');
}

function hideBtnMore() {
  btnLoad.classList.add('is-hidden');
}

function checkBtnStatus() {
  if (currentPage >= maxPage) {
    hideBtnMore();
    endImgList();
  } else {
    showBtnMore();
  }
}

function myScroll() {
  const height = imgList.firstChild.getBoundingClientRect().height;

  scrollBy({
    top: height * 3,
    behavior: 'smooth',
  });
}

function endImgList() {
  iziToast.info({
    message: "We're sorry, but you've reached the end of search results.",

    position: 'center',
  });
}
