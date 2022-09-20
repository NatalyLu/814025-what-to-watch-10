import { createAction } from '@reduxjs/toolkit';

export const setCorrectEmailStatus = createAction<boolean>('user/setCorrectEmailStatus');
