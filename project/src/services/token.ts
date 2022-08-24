// Сохраняем токен в localStorage

const AUTH_TOKEN = 'what-to-watch-token';

// Для большей ясности создадим тип Токена
export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN);
  // Сокращенная запись, если токен есть, берем его, если нет, то нет)
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN);
};
