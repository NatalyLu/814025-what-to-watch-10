import { createAction } from '@reduxjs/toolkit';

export const changingGenre = createAction( 'films/changingGenre',(genre) => ({payload: genre}) );

export const filmsByGenre = createAction('films/filmsByGenre');
