import { AuthorizationStatus, NameSpace } from '../../enums';
import { State } from '../../types/state';
import { Films } from '../../types/types';
import { UserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getFavorites = (state: State): Films => state[NameSpace.User].favorites.data;
export const getFavoritesStatus = (state: State): boolean => state[NameSpace.User].favorites.isLoaded;

export const getFavoriteStatus = (state: State): boolean | null => state[NameSpace.User].favorites.isFavoriteActionSending;

export const getUserData = (state: State): UserData | undefined => state[NameSpace.User].userData;

export const getDataStatus = (state: State): boolean => state[NameSpace.User].isDataCorrect;
