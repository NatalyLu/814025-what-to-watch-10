import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { Films } from '../../types/types';
import { UserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getFavorites = (state: State): Films => state[NameSpace.User].favorites.data;
export const getFavoritesStatus = (state: State): boolean => state[NameSpace.User].favorites.isLoaded;
// пока нигде не используется
export const getSendFavoriteStatus = (state: State): boolean => state[NameSpace.User].favorites.isSendFavoriteAction;

export const getUserData = (state: State): UserData | undefined => state[NameSpace.User].userData;

