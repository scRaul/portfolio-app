
export type TTextData = {
  style: string,
  data: string
}

export interface IJournalContent {
  type: string;
  text: TTextData[];
}