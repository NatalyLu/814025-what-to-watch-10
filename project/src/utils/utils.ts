import { filmTextRating } from '../const';
import {Films} from '../types/types';

export const checkId = (films: Films, id: number) => films.some((film) => film.id === id);

export const getDate = (date: Date) => (
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(date)
);

export const getStarsCount = (rating: number) => {
  if (rating < 3){
    return filmTextRating.bad;
  } else if(rating < 5){
    return filmTextRating.normal;
  } else if (rating < 8) {
    return filmTextRating.good;
  } else if (rating < 10) {
    return filmTextRating.better;
  } else {
    return filmTextRating.awesome;
  }
};

export const checkPassword = (password: string) => {
  const letterPattern = /(?=.*?[a-z])/;
  const numberPattern = /(?=.*?[0-9])/;
  const minLength = /.{2,}/;

  const hasLetters = letterPattern.test(password.toLowerCase());
  const hasNumbers = numberPattern.test(password);
  const hasMinLength = minLength.test(password);

  return hasLetters && hasNumbers && hasMinLength;
};

// Принимает время в секундах
// Возвращает hh:mm:ss или mm:ss, если часов нет
export const getFullTimeFromSeconds = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minuts = Math.floor((time - hours * 3600) / 60);
  const seconds = Math.floor(time - hours * 3600 - minuts * 60);
  const timeWithPad = (num: number) => num.toString().padStart(2, '0');

  if (!hours) {
    return `${timeWithPad(minuts)}:${timeWithPad(seconds)}`;
  } else {
    return `${timeWithPad(hours)}:${timeWithPad(minuts)}:${timeWithPad(
      seconds
    )}`;
  }
};
