export interface Feedback {
  id: string;
  feedback: string;
  author: string;
  rating: number;
}

export interface FeedbackNew {
  feedback: string;
  author: string;
  rating: number;
}
