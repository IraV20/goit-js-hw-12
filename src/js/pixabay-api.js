import axios from 'axios';

export default async function searchImg(userValue, currentPage) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const API_KEY = '42716405-8ee00579c2dae2c7c3ba8a313';
  const params = {
    key: API_KEY,
    q: userValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 15,
  };

  const url = BASE_URL + END_POINT;

  const res = await axios.get(url, { params });
  return res.data;
}
