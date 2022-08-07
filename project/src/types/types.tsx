export type Film = {
  id: string;
  link: string;
  name: string;
}

export type Films = Film[];

export type PromoFilm = {
  name: string;
  gender: string;
  year: string;
}

export type Video =  {
  poster: string;
  link: string;
}

export type VideoObj =  {
  video: Video;
}

export type FilmsData = (Film & VideoObj)[];

export type Review = {
  rating: {
    score: string,
    level: string,
    count: string,
  },
  text: {
    first: string,
    second?: string,
  },
  director: string,
  starring: string,
}
