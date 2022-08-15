export type Film = {
  id: string;
  genre: string;
  link: string;
  name: string;
}

export type PromoFilm = {
  name: string;
  genre: string;
  year: string;
}

export type VideoContent = {
  poster: string;
  link: string;
}

export type VideoObj = {
  video: VideoContent;
}

export type FilmData = Film & VideoObj;
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

export type TabsReview = {
  description: string,
  author: string,
  dateTime: string,
  date: string,
  rating: string,
}
