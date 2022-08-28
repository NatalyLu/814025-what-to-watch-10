import {Films} from '../types/types';

export const checkId = (films: Films, id: number) => films.some((film) => film.id === id);
