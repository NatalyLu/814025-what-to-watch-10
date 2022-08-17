import { createAction } from '@reduxjs/toolkit';

export const changingGenre = createAction<string>('films/changingGenre');

export const filmsByGenre = createAction('films/filmsByGenre');
