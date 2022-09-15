import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const setCorrectEmailStatus = createAction<boolean>('user/setCorrectEmailStatus');


export const redirectToRoute = createAction<AppRoute | string>('films/redirectToRoute');
