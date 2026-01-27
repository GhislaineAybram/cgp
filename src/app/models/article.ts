export interface Article {
  id: string;
  theme: string;
  date: Date;
  title: string;
  text: string;
  source: string;
  link: string;
}

export interface ArticleNew {
  theme: string;
  date: Date;
  title: string;
  text: string;
  source: string;
  link: string;
}
