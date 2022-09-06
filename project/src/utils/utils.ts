import {Films} from '../types/types';

export const checkId = (films: Films, id: number) => films.some((film) => film.id === id);

export const getDate = (date: Date): string => {
  const monthMap = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = (date.getDay() + 1).toString().padStart(2, "0");
  const month = monthMap[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};