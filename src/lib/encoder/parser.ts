import fs from 'fs';
import {list} from 'postcss';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import {unified} from 'unified';

export function readFileContents(filePath: string): string|null {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}
function extractChildren(
    parentsList: string[], childNode: any, data: string[]) {
  if (childNode.type == 'text') {
    data.push(childNode.value);
    return [parentsList, data];
  } else if (childNode.type == 'image') {
    data.push(childNode.url);
    data.push(childNode.title);
    data.push(childNode.alt);
    return [parentsList, data];
  }


  if ('children' in childNode) {
    childNode.children.forEach((node: any) => {
      if (node.type != 'break') {
        if (node.type == 'listItem' || node.type == 'list') {
          parentsList.push('li-' + node.position.start.column);
        }
        parentsList.push(node.type);
      }
      [parentsList, data] = extractChildren(parentsList, node, data);
    });
  }
  return [parentsList, data];
}
export async function getMarkdownBlocks(markdownPath: string) {
  const markdown = readFileContents(markdownPath);
  if (!markdown) return [];
  const blockList: MdBlock[] = [];
  try {
    const tree = unified()
                     .use(remarkParse)
                     .use(remarkFrontmatter)
                     .use(remarkGfm)
                     .parse(markdown);
    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];
      if (child.type == 'thematicBreak') continue;
      var parent: string = '';
      if (child.type == 'heading') {
        parent = child.type + child.depth;
      } else if (child.type == 'list') {
        parent = child.ordered ? 'ol' : 'ul';
      } else if (child.type != 'break') {
        parent = child.type;
      }
      const [parentsList, data] = extractChildren([parent], child, []);
      const block = createBlock(parentsList, data);
      blockList.push(block);
      printBlock(block);
    }


    return blockList;
  } catch (error) {
    console.error('Error parsing Markdown:', error);
    return [];
  }
}


export interface MdData {
  type: 'text'|'math';
  data: string;
}

export interface MdNode {
  style: string;
  data: MdData[];
}
export interface MdBlock {
  block: string;
  node: MdNode[];
}

function createBlock(parents: string[], data: string[]): MdBlock {
  var block: MdBlock = {block: parents[0], node: []};
  var pp = parents.length - 1;
  var dp = data.length - 1;
  var nodes: MdNode[] = [];
  while (dp >= 0) {
    var node: MdNode = {style: parents[pp], data: []};
    if (parents[pp] == 'image') {
      for (let i = 0; i <= dp; i++) {
        node.data.push({type: 'text', data: data[i]});
      }
      dp -= 4;
    } else {
      block.block =
          (data[dp].substring(0, 2) === '$$') ? 'mblock' : block.block;
      var tokens = data[dp].split('$');
      tokens.forEach(tok => {
        const value:
            MdData = {type: tok[0] == '{' ? 'math' : 'text', data: tok};
        if (value.type == 'math') {
          value.data = value.data.replace('\\\n', '\\\\\n');
        }
        if (value.data != '') node.data.push(value);
      });

      pp -= 1;
      while (parents[pp] != 'text' && pp >= 1) {
        node.style = parents[pp];
        pp -= 1;
      }
    }

    block.node.push(node);
    dp -= 1;
  }

  block.node.reverse();
  return block;
}

function printBlock(block: MdBlock) {
  console.log(block);
  block.node.forEach(n => {
    console.log(n);
  });
  console.log('\n----\n');
}