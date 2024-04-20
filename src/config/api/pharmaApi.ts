import axios from 'axios';

import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();


const pharmaApi = axios.create({
    baseURL: VITE_API_URL
});


pharmaApi.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');
    
    if ( token ) {
      config.headers.Authorization = `Bearer ${ token }`;
    }
  
    return config;
});
  

export default pharmaApi;