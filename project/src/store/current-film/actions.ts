import { createAction } from '@reduxjs/toolkit';
import { Film } from '../../types/types';

export const changeCurrentFilm = createAction<Film>('data/loadCurrentFilm');
