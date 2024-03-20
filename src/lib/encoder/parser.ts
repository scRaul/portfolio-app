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
type BlockType = 'code'|'mathblock'|'yaml'|'paragraph'|'image'|'footnote';
type ParaType = 'text'|'link'|'footref';

interface Code {
  lang: string;
  meta: string;
  value: string;
}
interface MathBlock {
  meta: string;
  value: string;
}
interface Paragraph {
  type: ParaType;
  data: any[];
}
interface Footnote {
  id: string;
  data: Text[];
}
interface FootRef {
  id: string;
}
interface Text {
  style: 'text'|'strong'|'emphasis'|'inlinemath';
  value: string
}
interface Link {
  title: string;
  url: string;
}
interface Img {
  title: string;
  url: string;
  alt: string;
}
interface MDBlock {
  type: BlockType;
  data: any;
}

export function readFileContents(filePath: string): string|null {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}

export async function parseMarkdown<T extends MarkdownMetadata>(
    markdownPath: string, interfaceType: T) {
  const markdown = readFileContents(markdownPath);
  if (!markdown) return null;
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
          const mathblock: MathBlock = {meta, value};
        blocks.push({type: 'mathblock', data: mathblock});
      } else if (child.type == 'paragraph') {
        blocks.push(...parseParagraph(child, i));
      } else if (child.type == 'footnoteDefinition') {
        const temp = parseParagraph(child, i);
        let data: any[] = [];
        temp.forEach(
            block => {block.data.forEach(
                (item: any) => {item.forEach((text: Text) => {
                  data.push(text);
                })

                })});
        const footnote: Footnote = {id: child.identifier, data: data};
        blocks.push({type: 'footnote', data: footnote});
      } else {
        console.log(child.type)
      }
    }
    // console.log(blocks);

  } catch (error) {
    console.error('Error parsing Markdown:', error);
    return null;
  }
}

function parseParagraph(paragraph: any, index: number) {
  const type = 'paragraph';
  const data: any[] = [];
  const blocks: MDBlock[] = [];
  paragraph.children.forEach((grand: any) => {
    if (grand.type == 'break') return;
    if (grand.type == 'text') {
      const text: Text = {style: 'text', value: grand.value};
      data.push(text);
    } else if (grand.type == 'strong' || grand.type == 'emphasis') {
      if (grand.children[0].type == 'text') {
        const text: Text = {style: grand.type, value: grand.children[0].value};
        data.push(text);
      }
    } else if (grand.type == 'inlineMath') {
      const text: Text = {style: 'inlinemath', value: grand.value};
      data.push(text);
    } else if (grand.type == 'link') {
      let {title, url} = grand;
      if (!title) title = url;
      const link: Link = {title, url};
      data.push(link);
    } else if (grand.type == 'image') {
      let {title, url, alt} = grand;
      if (!title) title = `Figure ${index}`;
      if (!alt) alt = 'image';
      const data: Img = {title, url, alt};
      blocks.push({type: 'image', data});

    } else if (grand.type == 'footnoteReference') {
      data.push({type: 'footref', data: {id: grand.identifier}});
    } else if (grand.type == 'paragraph') {
      const temp = parseParagraph(grand, index);
      temp.forEach((block) => {
        data.push(block.data);
      })
    } else {
      console.log(grand);
    }
  })
  blocks.push({type, data});
  return blocks;
}