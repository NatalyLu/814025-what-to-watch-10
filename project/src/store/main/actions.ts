import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<string>('films/changingGenre');
