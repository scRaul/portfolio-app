
export interface MarkdownMetadata {
  [key: string]: any;
}
export type BlockType = 'code'|'mathblock'|'yaml'|'paragraph'|'image'|
    'footnote'|'list'|'heading'|'table';
export type ParaType = 'text'|'link'|'footref';

export interface Code {
  lang: string;
  meta: string;
  value: string;
}
export interface MathBlockMd {
  meta: string;
  value: string;
}
export interface ParagraphMd {
  type: ParaType;
  data: any[];
}
export interface Footnote {
  id: string;
  data: TextMd[];
}
export interface FootRef {
  id: string;
}
export interface TextMd {
  style: 'text'|'strong'|'emphasis'|'inlinemath'|'emphasis-strong';
  value: string
}
export interface TempLink {
  title: string;
  url: string;
  children?: TextMd[];
}
export interface LinkMd {
  title: string;
  url: string;
}
export interface ImgMd {
  title: string;
  url: string;
  alt: string;
}
export interface HeadingMd {
  depth: number;
  id: string;
  text: TextMd[];
}
export interface MDBlock {
  type: BlockType;
  data: any;
}
export interface ListMd {
  style: 'ol'|'ul';
  data: any[];
}
export type TSectionId = {
  slug: string,
  id: string
};
export interface Article<T extends MarkdownMetadata> {
  metadata: T|null;
  sectionId: TSectionId[];
  section: MDBlock[][];
}
