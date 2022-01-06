import axios from 'axios';

const mirrorApi = axios.create({
  baseURL: 'https://p9lzp1uqx9.execute-api.eu-central-1.amazonaws.com/content',
  withCredentials: false,
});

export default mirrorApi;
