import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {getToken} from "./token";

const BACKEND_URL = 'https://10.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

export const createAPI = ():AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  // Извлекаем токен из localStorage (с помощью перехватчиков - interceptors)
  // Перехватываем запрос - request
  api.interceptors.request.use((config: AxiosRequestConfig) => {
    
    // Настраиваем перехватчик, который будет вызывать формирования запроса, но до его отправки серверу.
    // Здесь мы сможем модифицировать конфигурацию axios.
    const token = getToken();

    // И вставляем токен в заголовки
    if (token) {
      config.headers["x-token"] = token;
    }
    return config;
  });

  return api;
}
