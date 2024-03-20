import exp from 'constants';
import fs from 'fs';
import yaml from 'js-yaml';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import {unified} from 'unified';


interface MarkdownMetadata {
  [key: string]: any;
}
type BlockType = 'code'|'mathblock'|'yaml'|'paragraph'|'image'|'footnote'|
    'list'|'heading'|'table';
type ParaType = 'text'|'link'|'footref';

interface Code {
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
interface Footnote {
  id: string;
  data: TextMd[];
}
interface FootRef {
  id: string;
}
export interface TextMd {
  style: 'text'|'strong'|'emphasis'|'inlinemath'|'emphasis-strong';
  value: string
}
interface TempLink {
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
export function readFileContents(filePath: string): string|null {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}

export function parseMarkdown<T extends MarkdownMetadata>(
    markdownPath: string, interfaceType: T): MDBlock[] {
  const markdown = readFileContents(markdownPath);
  if (!markdown) return [];
  try {
    const processor = unified()
                          .use(remarkParse)
                          .use(remarkFrontmatter)
                          .use(remarkGfm)
                          .use(remarkMath)
    const blocks: MDBlock[] = [];
    const tree = processor.parse(markdown);
    let i = 0;
    const yamlNode = tree.children[i];
    if (yamlNode.type == 'yaml') {
      i++;
      const yamlContent = yamlNode.value;
      const metadata = yaml.load(yamlContent) as T;
      blocks.push({type: 'yaml', data: metadata});
    }

    for (; i < tree.children.length; i++) {
      const child = tree.children[i];
      if (child.type == 'code') {
        let {lang, meta, value} = child;
        if (!lang) lang = 'js';
        if (!meta) meta = '\';'
          const code: Code = {lang, meta, value};
        blocks.push({type: 'code', data: code});
      } else if (child.type == 'math') {
        let {meta, value} = child;
        if (!meta) meta = `Equation ${i}`
          const mathblock: MathBlockMd = {meta, value};
        blocks.push({type: 'mathblock', data: mathblock});
      } else if (child.type == 'paragraph') {
        blocks.push(...parseParagraph(child, i));
      } else if (child.type == 'footnoteDefinition') {
        const temp = parseParagraph(child, i);
        let data: any[] = [];
        temp.forEach(
            block => {block.data.forEach(
                (item: any) => {item.forEach((text: TextMd) => {
                  data.push(text);
                })

                })});
        const footnote: Footnote = {id: child.identifier, data: data};
        blocks.push({type: 'footnote', data: footnote});
      } else if (child.type == 'list') {
        const listData = parseList(child, i);
        const style = child.ordered ? 'ol' : 'ul';
        const list: ListMd = {style, data: listData};
        blocks.push({type: 'list', data: list});
      } else if (child.type == 'heading') {
        const {type, depth} = child;
        const text: TextMd[] = [];
        child.children.forEach((grand: any) => {
          text.push({style: grand.type, value: grand.value});
        })
        const heading: HeadingMd = {depth, text};
        blocks.push({type, data: heading});
      } else if (child.type == 'table') {
        const table: any[] = [];
        child.children.forEach((row: any) => {
          row.children.forEach((col: any) => {
            const tcblock = parseParagraph(col, i);
            table.push({style: 'td', data: tcblock[0].data});
          });
          table.push({style: 'tr', data: []});
        });
        blocks.push({type: 'table', data: table});
      } else {
        console.log(child.type)
      }
    }
    // printBlock(blocks);
    return blocks;
  } catch (error) {
    console.error('Error parsing Markdown:', error);
    return [];
  }
}

function parseList(list: any, index: number) {
  const listData: any[] = [];
  list.children.forEach((li: any) => {
    li.children.forEach((element: any, i: number) => {
      if (element.type == 'paragraph') {
        const lblocks = parseParagraph(element, i * 10 + index);
        lblocks.forEach(lblocks => {
          listData.push(lblocks.data);
        });
      } else if (element.type == 'list') {
        const otherList = parseList(element, index);
        listData.push([...otherList]);
      }
    });
  });
  return listData;
}
function parseParagraph(paragraph: any, index: number) {
  const type = 'paragraph';
  const data: any[] = [];
  const blocks: MDBlock[] = [];
  paragraph.children.forEach((grand: any) => {
    if (grand.type == 'break') return;
    if (grand.type == 'text') {
      const text: TextMd = {style: 'text', value: grand.value};
      data.push(text);
    } else if (grand.type == 'strong' || grand.type == 'emphasis') {
      if (grand.children[0].type == 'text') {
        const text:
            TextMd = {style: grand.type, value: grand.children[0].value};
        data.push(text);
      } else {  // nested
        const tstyle = grand.type + '-' + grand.children[0].type;
        if (tstyle == 'emphasis-strong') {
          const tvalue = grand.children[0].children[0].value;
          const text: TextMd = {style: tstyle, value: tvalue};
          data.push(text);
        }
      }
    } else if (grand.type == 'inlineMath') {
      const text: TextMd = {style: 'inlinemath', value: grand.value};
      data.push(text);
    } else if (grand.type == 'link') {
      let {title, url} = grand;
      if (!title) title = url;
      let children: TextMd[] = [];
      if (grand?.children) {
        grand.children.forEach((item: any) => {
          const txt: TextMd = {style: item.type, value: item.value};
          children.push(txt);
        })
      }
      if (children?.length) {
        title = children[0].value;
      }
      const link: LinkMd = {title, url};
      data.push(link);
    } else if (grand.type == 'image') {
      let {title, url, alt} = grand;
      if (!title) title = `Figure ${index}`;
      if (!alt) alt = 'image';
      const data: ImgMd = {title, url, alt};
      blocks.push({type: 'image', data});

    } else if (grand.type == 'footnoteReference') {
      data.push({type: 'footref', data: {id: grand.identifier}});
    } else if (grand.type == 'paragraph') {
      const temp = parseParagraph(grand, index);
      temp.forEach((block) => {
        data.push(block.data);
      })
    } else {
      console.log(grand.type);
    }
  })
  blocks.push({type, data});
  return blocks;
}


export function printBlock(blocks: MDBlock[]) {
  blocks.forEach(block => {
    console.log(block);
    if (block.type == 'list') {
      block.data.forEach((n: any) => {
        console.log(n);
      });
    }
    console.log('\n----\n');
  });
}