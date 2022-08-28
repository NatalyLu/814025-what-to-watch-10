import {Films} from '../types/types';

export const checkId = (films: Films, id: number) => {
  console.log({ 'films': films, 'id': id, 'some': films.some((film) => film.id === id)});
  return films.some((film) => film.id === id);
};
