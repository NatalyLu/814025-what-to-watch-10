export type Film = {
  film: {
    LINK: string;
    NAME: string;
  }
}

export type Films = {
  films: {LINK: string, NAME: string}[],
}

export type PromoFilm = {
  promoFilm: {
    NAME: string;
    GENDER: string;
    YEAR: string;
  }
}
