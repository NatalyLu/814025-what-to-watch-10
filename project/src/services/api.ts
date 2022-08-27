import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import {getToken} from './token';
import { BAD_REQUESTERROR } from '../const';

// Ключи - это коды ошибок ответа от сервера
const StatusCodeMapping = [
  StatusCodes.BAD_REQUEST,
  StatusCodes.UNAUTHORIZED,
  StatusCodes.NOT_FOUND,
];

// Тут принимаем ответ от сервера и возвращаем проверку кода ответа (response.status) через ранее созданное перечисление StatusCodeMapping
const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping.includes(response.status);

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
      config.headers['x-token'] = token;
    }
    return config;
  });

  // С помощью интерсетера проверяем наличие ошибки
  // Если имеется, то передаем в processErrorHandle текст ошибки
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        toast.error(error.response.data.error);
        if (error.response.status === BAD_REQUESTERROR) {
          throw error.response;
        }
      }

      // И прокидываем ошибку дальше, чтобы её можно было бы отловить в другом месте
      throw error;
    }
  );

  return api;
};
