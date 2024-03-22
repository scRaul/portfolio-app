
export type TTextData = {
  style: string,
  data: string
}

export interface IJournalContent {
  type: string;
  text: TTextData[];
}

export interface JournalMeta {
  title: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  hero: string;
  content: string;
  slug: string;
  published: boolean;
}