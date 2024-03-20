import fs from 'fs';
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
  if (childNode.type == 'code') {
    parentsList.push(childNode.lang);
    data.push(childNode.value);
    return [parentsList, data];
  }
  if (childNode.type == 'text') {
    var tokens = childNode.value.split('$');
    console.log(tokens);
    tokens.forEach((tok: string) => {
      if (tok == '') return;
      if (tok[1] == '\n') {
        parentsList.push('mathblock');
        tok = tok.replaceAll('\\\n', '\\\\\n');
      } else if (tok[0] == '{') {
        parentsList.push('math');
        tok = tok.replaceAll('\\\n', '\\\\\n');
      } else
        parentsList.push('text');

      data.push(tok)
    })
    return [parentsList, data];
  } else if (childNode.type == 'image') {
    parentsList.push('image');
    data.push(childNode.url);
    data.push(childNode.title);
    data.push(childNode.alt);
    return [parentsList, data];
  } else if (childNode.type == 'yaml') {
    data.push(childNode.value);
    return [parentsList, data];
  } else if (childNode.type == 'link') {
    parentsList.push('link');
    data.push(childNode.url);
    data.push(childNode.children[0].value);
    return [parentsList, data];
  }
  if ('children' in childNode) {
    childNode.children.forEach((node: any) => {
      if (node.type != 'break') {
        if (node.type == 'listItem' || node.type == 'list') {
          parentsList.push('li-' + node.position.start.column);
        } else if (
            node.type != 'text' && node.type != 'image' &&
            node.type != 'paragraph') {
          parentsList.push(node.type);
        }
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

      const [parentsList, data] = extractChildren([child.type], child, []);
      const block = createBlock(parentsList, data, child, i);
      blockList.push(block);
    }


    return blockList;
  } catch (error) {
    console.error('Error parsing Markdown:', error);
    return [];
  }
}
export type MdValue = {
  style: string; value: string;
}

export interface MdNode {
  type: string;
  values: MdValue[];
}
export interface MdBlock {
  index: number;
  type: string;
  style: string;
  nodes: MdNode[];
}

function createBlock(
    parents: string[], data: string[], child: any, index: number): MdBlock {
  var type = parents[0];
  var style = '';
  if (type == 'heading') {
    style = child.depth.toString();
  }
  if (type == 'list') {
    style = child.ordered ? 'ol' : 'ul';
  }
  if (type == 'code') {
    style = parents[1];
    return {type, style, nodes: [{type: data[0], values: []}], index};
  }
  if (parents[1] == 'link') {
    var url: MdValue = {style: parents[parents.length - 1], value: data[0]};
    var alt: MdValue = {style: parents[parents.length - 1], value: data[1]};
    var node: MdNode = {type: 'link', values: [url, alt]};
    return {type, style, nodes: [node], index};
  }
  const block: MdBlock = {type, style, nodes: [], index};
  if (type == 'yaml') {
    block.style = data[0];
    return block;
  }
  var p = 1;
  var d = 0;
  while (d < data.length && p < parents.length) {
    type = '';
    style = '';
    var node: MdNode = {type, values: []};
    if (parents[p].includes('li')) {
      node.type = parents[p];
      p++;
      while (p < parents.length && d < data.length &&
             !parents[p].includes('li')) {
        node.values.push({style: parents[p], value: data[d]});
        d++;
        if (parents[p] == 'strong' || parents[p] == 'emphasis') {
          p += 2;
        } else {
          p++;
        }
      }

      p--;
      d--;
      if (node.values.length > 0) {
        block.nodes.push(node);
      }
    } else if (parents[p].includes('Row')) {
      block.nodes.push({type: 'tr', values: []});
      d--;
    } else if (parents[p].includes('Cell')) {
      node.type = 'td';
      p++;
      while (p < parents.length && d < data.length &&
             !parents[p].includes('Cell') && !parents[p].includes('Row')) {
        node.values.push({style: parents[p], value: data[d]});
        d++;
        if (parents[p] == 'strong' || parents[p] == 'emphasis') {
          p += 2;
        } else {
          p++;
        }
      }

      p--;
      d--;
      block.nodes.push(node);
    } else {
      style = parents[p];
      if (style == 'image') {
        node.type = 'image';
        node.values.push({style: 'url', value: data[d]})
        node.values.push({style: 'title', value: data[d + 1]})
        node.values.push({style: 'alt', value: data[d + 2]})
      } else {
        node.values.push({style: parents[p], value: data[d]});
        if (parents[p] == 'emphasis' || parents[p] == 'strong') {
          p++;
        }
        if (parents[p] == 'mathblock') {
          node.type = 'mathblock';
        }
      }
      block.nodes.push(node);
    }

    if (block.type == 'paragraph') {
      if (block.nodes[0].type == 'mathblock') {
        block.type = 'mathblock';
      } else
        block.style = 'paragraph';
    }


    d++;
    p++;
  }

  return block;
}

export function printBlock(block: MdBlock) {
  console.log(block);
  block.nodes.forEach(n => {
    console.log(n);
  });
  console.log('\n----\n');
}
