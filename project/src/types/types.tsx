export type Film = {
  id: number;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: [string];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export type Films = Film[];

export type TabsReview = {
  description: string,
  author: string,
  dateTime: string,
  date: string,
  rating: string,
}

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number,
    name: string,
  };
}

export type Reviews = Review[];
