import axios from 'axios';

const mirrorApi = axios.create({
  baseURL: 'https://mirror.xyz/api',
});

export default mirrorApi;
