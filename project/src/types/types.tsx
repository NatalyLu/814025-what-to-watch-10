export type VideoContent = {
  poster: string;
  link: string;
}

export type Film = {
  id: string;
  genre: string;
  link: string;
  name: string;
  year: number;
  video: VideoContent;
}

export type PromoFilm = {
  name: string;
  genre: string;
  year: string;
}

export type Films = Film[];

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
