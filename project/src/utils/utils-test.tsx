import { NameSpace } from '../enums';
import { createMockStore, mockStoreDefaultProps } from './mocks';


export const utilsTest = (props = mockStoreDefaultProps) => {
  const mockStore = createMockStore(props).store;
  const mockMainPageReducer = mockStore.getState()[NameSpace.Main];
  const mockCurrentFilmReducer = mockStore.getState()[NameSpace.Film];
  const mockUserReducer = mockStore.getState()[NameSpace.User];

  const mockFilms = mockMainPageReducer?.films?.data;
  const mockPromo = mockMainPageReducer?.promo?.data;
  const mockActiveGenre = mockMainPageReducer?.genres?.activeGenre;

  const mockCurrentFilm = mockCurrentFilmReducer?.film?.data;
  const mockSimilarFilms = mockCurrentFilmReducer?.similar?.data;
  const mockReviews = mockCurrentFilmReducer?.reviews?.data;
  // const mockIsReviewSending = mockCurrentFilmReducer?.isReviewSending;

  const mockUserData = mockUserReducer?.userData;
  const mockFavoritesFilms = mockUserReducer?.favorites?.data;

  return {
    mockFilms,
    mockPromo,
    mockActiveGenre,
    mockCurrentFilm,
    mockSimilarFilms,
    mockReviews,
    mockUserData,
    mockFavoritesFilms
  };
};
