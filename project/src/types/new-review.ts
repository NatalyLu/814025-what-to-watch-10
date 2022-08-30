export type NewReview = {
  comment: string;
  rating: number;
};

export type NewReviewWithID = {
  id: number | undefined;
  review: NewReview;
};
