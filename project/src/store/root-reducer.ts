import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../enums';
import { currentFilmSlice } from './current-film/slice';
import { mainSlice } from './main/slice';
import { userSlice } from './user/slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Film]: currentFilmSlice.reducer,
  [NameSpace.Main]: mainSlice.reducer,
});
