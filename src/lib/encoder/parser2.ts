
import fs from 'fs';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import {unified} from 'unified';

type _blockTypes =
    'p'|'h'|'table'|'ol'|'ul'|'img'|'aside'|'code'|'meta'|undefined;
type _block = [id: number, type: _blockTypes, style: string];

type _data = [type: 'text'|'math', style: string, value: string];
type _nodeTypes = 'li'|'tr'|'td'|'img'|'span'
type _node =
    [blockId: number, type: _nodeTypes, style: string, values: _data[]];


export function readFileContents(filePath: string): string|null {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}


export async function getMarkdownBlocks2(markdownPath: string) {
  const markdown = readFileContents(markdownPath);
  if (!markdown) return [];

  try {
    const tree = unified()
                     .use(remarkParse)
                     .use(remarkFrontmatter)
                     .use(remarkGfm)
                     .parse(markdown);
    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];
      if (child.type == 'thematicBreak') continue;
      var block: _blockTypes = undefined;
      switch (child.type) {
        case 'yaml':
          block = 'meta';
          break;
        case 'heading':
          block = 'h';
          break;
        case 'paragraph':
          block = 'p';
          break;
        case 'list':
          block = (child.ordered) ? 'ol' : 'ul';
          break;
        case 'table':
          block = 'table';
          break;
        default:
          break;
      }
      console.log(block);
    }


    return [];
  } catch (error) {
    console.error('Error parsing Markdown:', error);
    return [];
  }
}
