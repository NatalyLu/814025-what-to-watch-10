import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { StatusCodes } from 'http-status-codes';
import {setDataLoadedStatus} from '../store/action';
import {getToken} from './token';
import { processErrorHandle } from './process-error-handle';
import { store } from '../store';

// Record для описания формы нашего обьекта, т.е. ожидаем обьект с числовыми ключами и булевыми значениями
// Ключи - это коды ошибок ответа от сервера
const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

// Тут принимаем ответ от сервера и возвращаем проверку кода ответа (response.status) через ранее созданное перечисление StatusCodeMapping
const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

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
    store.dispatch(setDataLoadedStatus(true));
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
    (response) => {
      store.dispatch(setDataLoadedStatus(false));
      return response;
    },
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        processErrorHandle(error.response.data.error);
      }

      // И прокидываем ошибку дальше, чтобы её можно было бы отловить в другом месте
      throw error;
    }
  );

  return api;
};
