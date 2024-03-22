import * as fs from "fs";
import * as yaml from "js-yaml";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { unified } from "unified";

export function readFileContents(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

export function parseMarkdown(markdownPath, interfaceType) {
  var article = { metadata: null, sectionId: [], section: [] };
  const markdown = readFileContents(markdownPath);
  if (!markdown) return article;
  try {
    const processor = unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkGfm)
      .use(remarkMath);
    var blocks = [];
    const sectionId = [];
    const section = [];
    var metadata = null;
    const tree = processor.parse(markdown);
    let i = 0;
    const yamlNode = tree.children[i];
    if (yamlNode.type == "yaml") {
      i++;
      const yamlContent = yamlNode.value;
      metadata = yaml.load(yamlContent);
    }

    for (; i < tree.children.length; i++) {
      const child = tree.children[i];
      if (child.type == "heading") {
        const { type, depth } = child;
        const text = [];
        var values = [];
        child.children.forEach((grand) => {
          text.push({ style: grand.type, value: grand.value });
          const tokens = grand.value.split(" ");
          values.push(...tokens);
        });
        const id = values.join("-").toLowerCase();
        const heading = { depth, text, id };
        blocks.push({ type, data: heading });

        if (depth == 2) {
          if (sectionId.length > 0) {
            section.push(blocks);
            blocks = [];
          }
          const slug = values.join(" ");
          sectionId.push({ slug, id });
        }
      } else if (child.type == "code") {
        let { lang, meta, value } = child;
        if (!lang) lang = "js";
        if (!meta) meta = "';";
        const code = { lang, meta, value };
        blocks.push({ type: "code", data: code });
      } else if (child.type == "math") {
        let { meta, value } = child;
        if (!meta) meta = `Equation ${i}`;
        const mathblock = { meta, value };
        blocks.push({ type: "mathblock", data: mathblock });
      } else if (child.type == "paragraph") {
        blocks.push(...parseParagraph(child, i));
      } else if (child.type == "footnoteDefinition") {
        const temp = parseParagraph(child, i);
        let data = [];
        temp.forEach((block) => {
          block.data.forEach((item) => {
            item.forEach((text) => {
              data.push(text);
            });
          });
        });
        const footnote = { id: child.identifier, data: data };
        blocks.push({ type: "footnote", data: footnote });
      } else if (child.type == "list") {
        const listData = parseList(child, i);
        const style = child.ordered ? "ol" : "ul";
        const list = { style, data: listData };
        blocks.push({ type: "list", data: list });
      } else if (child.type == "table") {
        const table = [];
        child.children.forEach((row) => {
          row.children.forEach((col) => {
            const tcblock = parseParagraph(col, i);
            table.push({ style: "td", data: tcblock[0].data });
          });
          table.push({ style: "tr", data: [] });
        });
        blocks.push({ type: "table", data: table });
      } else {
        console.log(child.type);
      }
    }

    section.push(blocks);
    article = { metadata, sectionId, section };

    return article;
  } catch (error) {
    console.error("Error parsing Markdown:", error);
    return article;
  }
}

function parseList(list, index) {
  const listData = [];
  list.children.forEach((li) => {
    li.children.forEach((element, i) => {
      if (element.type == "paragraph") {
        const lblocks = parseParagraph(element, i * 10 + index);
        lblocks.forEach((lblocks) => {
          listData.push(lblocks.data);
        });
      } else if (element.type == "list") {
        const otherList = parseList(element, index);
        listData.push([...otherList]);
      }
    });
  });
  return listData;
}
function parseParagraph(paragraph, index) {
  const type = "paragraph";
  const data = [];
  const blocks = [];
  paragraph.children.forEach((grand) => {
    if (grand.type == "break") return;
    if (grand.type == "text") {
      const text = { style: "text", value: grand.value };
      data.push(text);
    } else if (grand.type == "strong" || grand.type == "emphasis") {
      if (grand.children[0].type == "text") {
        const text = { style: grand.type, value: grand.children[0].value };
        data.push(text);
      } else {
        // nested
        const tstyle = grand.type + "-" + grand.children[0].type;
        if (tstyle == "emphasis-strong") {
          const tvalue = grand.children[0].children[0].value;
          const text = { style: tstyle, value: tvalue };
          data.push(text);
        }
      }
    } else if (grand.type == "inlineMath") {
      const text = { style: "inlinemath", value: grand.value };
      data.push(text);
    } else if (grand.type == "link") {
      let { title, url } = grand;
      if (!title) title = url;
      let children = [];
      if (grand?.children) {
        grand.children.forEach((item) => {
          const txt = { style: item.type, value: item.value };
          children.push(txt);
        });
      }
      if (children?.length) {
        title = children[0].value;
      }
      const link = { title, url };
      data.push(link);
    } else if (grand.type == "image") {
      let { title, url, alt } = grand;
      if (!title) title = `Figure ${index}`;
      if (!alt) alt = "image";
      const data = { title, url, alt };
      blocks.push({ type: "image", data });
    } else if (grand.type == "footnoteReference") {
      data.push({ type: "footref", data: { id: grand.identifier } });
    } else if (grand.type == "paragraph") {
      const temp = parseParagraph(grand, index);
      temp.forEach((block) => {
        data.push(block.data);
      });
    } else {
      console.log(grand.type);
    }
  });
  blocks.push({ type, data });
  return blocks;
}
