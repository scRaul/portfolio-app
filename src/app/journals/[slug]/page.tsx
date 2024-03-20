import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import {
  MdBlock,
  MdNode,
  MdValue,
  getMarkdownBlocks,
  printBlock,
} from "@/lib/encoder/parser2";
import Image from "next/image";
import { ReactNode } from "react";
import { H1, H2, H3, H4, H5, H6 } from "@/components/Text";
import { randomUUID } from "crypto";
import CodeBlock from "@/components/CodeBlock";
import { parseMarkdown } from "@/lib/encoder/parser";

export default async function JounralPage({
  params,
}: {
  params: { slug: string };
}) {
  parseMarkdown(`src/content/journals/md/test.md`, {
    title: "",
    createdAt: "",
    updatedAt: "",
    author: "",
    hero: "",
    published: false,
  });
  // const blocks = await getMarkdownBlocks(`src/content/journals/md/test.md`);
  // const header = parseYaml(blocks[0]);
  // const reactNodes: ReactNode[] = blocks.map(parseBlock);
  // const section = [header, reactNodes];
  return (
    <article className="pt-1 pl-2 w-full">
      {/* <div className="w-full">{section}</div> */}
    </article>
  );
}
function parseBlock(block: MdBlock): ReactNode {
  if (block.type == "table") {
    return parseTable(block);
  }
  if (block.type == "code") {
    return (
      <CodeBlock
        code={block.nodes[0].type}
        language={block.style}
        key={"code-" + block.index}
      ></CodeBlock>
    );
  }
  var reactNodes: ReactNode[] = [];
  block.nodes.forEach((node) => {
    reactNodes.push(parseNode(node));
  });
  if (block.type == "heading") {
    switch (block.style) {
      case "2":
        return (
          <H2 className="font-semibold" key={"h-" + block.index}>
            {reactNodes}
          </H2>
        );
      case "3":
        return (
          <div className="flex gap-2 items-baseline" key={"h3-" + block.index}>
            <div className="w-3 h-4 bg-red-500"></div>
            <H3 className="font-semibold">{reactNodes}</H3>
          </div>
        );
      case "4":
        return (
          <H4 className="font-semibold" key={"h-" + block.index}>
            {reactNodes}
          </H4>
        );
      case "5":
        return (
          <H5 className="font-semibold" key={"h-" + block.index}>
            {reactNodes}
          </H5>
        );
      case "6":
        return (
          <H6 className="font-semibold" key={"h-" + block.index}>
            {reactNodes}
          </H6>
        );
      default:
        return <p key={"p-" + block.index}>{reactNodes}</p>;
    }
  }
  if (block.type == "paragraph") {
    if (block.style == "paragraph") {
      return (
        <p className="mb-2" key={"p-" + block.index}>
          {reactNodes}
        </p>
      );
    }
    return reactNodes;
  }
  if (block.type == "list") {
    if (block.style == "ol") {
      return (
        <ol className="list-decimal list-inside" key={"ol-" + block.index}>
          {reactNodes}
        </ol>
      );
    } else {
      return (
        <ul className="list-disc list-inside" key={"ol-" + block.index}>
          {reactNodes}
        </ul>
      );
    }
  }
  if (block.type == "blockquote") {
    return <div className="p-3 bg-[#4a36ff30]">{reactNodes}</div>;
  }
  return reactNodes;
}

function parseNode(node: MdNode): ReactNode {
  if (node.type == "image") {
    const url = node.values[0].value.split("/public")[1];
    const title = node.values[1].value;
    const alt = node.values[2].value;
    return (
      <div key={`img-${randomUUID()}`} className=" w-fit mx-auto">
        <Image src={url} alt={alt} width={500} height={500} />
        <p className="text-blue-800 font-semibold">{title}</p>
      </div>
    );
  }
  if (node.type == "link") {
    const url = node.values[0]?.value;
    if (!url) return <p>{"unable to link"}</p>;
    return (
      <a href={url} className="text-blue-500 underline">
        {node.values[1].value}
      </a>
    );
  }
  var reactNodes: ReactNode[] = [];
  node.values.forEach((value) => {
    reactNodes.push(parseValue(value));
  });

  if (node.type[0] == "l" && node.type[2] == "-") {
    const m = parseInt(node.type.split("-")[1]);
    return (
      <li style={{ marginLeft: m * 10 + "px" }} key={`li-${randomUUID()}`}>
        {reactNodes}
      </li>
    );
  }
  return reactNodes;
}
function parseValue(value: MdValue): ReactNode {
  if (value.style == "mathblock") {
    return (
      <div
        className="border border-red-500 w-full p-2 mx-auto"
        key={"div-mb" + randomUUID()}
      >
        <BlockMath key={"mb" + randomUUID()}>{value.value}</BlockMath>
      </div>
    );
  } else if (value.style == "math") {
    return <InlineMath key={"im" + randomUUID()}>{value.value}</InlineMath>;
  } else {
    var className = "";
    if (value.style == "emphasis") className += "italic";
    else if (value.style == "strong") className += "font-extrabold";
    return (
      <span className={className} key={`sp-${randomUUID()}`}>
        {value.value}
      </span>
    );
  }
}

function parseTable(block: MdBlock) {
  const rows: number[] = [];
  for (let i = 1; i < block.nodes.length; i++) {
    if (block.nodes[i].type == "tr") {
      rows.push(i);
    }
  }
  var th: ReactNode[] = [];
  for (let i = 1; i < rows[0]; i++) {
    th.push(
      <th className="border border-black" key={`th-${block.index}.${i}`}>
        {parseNode(block.nodes[i])}
      </th>
    );
  }
  var tr: ReactNode[] = [];
  var td: ReactNode[] = [];
  var r = 0;
  for (let r = 0; r < rows.length - 1; r++) {
    for (let c = rows[r] + 1; c < rows[r + 1]; c++) {
      td.push(
        <td className="border border-black p-1" key={`td-${block.index}.${c}`}>
          {parseNode(block.nodes[c])}
        </td>
      );
    }
    tr.push(<tr key={`tr-${block.index}.${r}`}>{td}</tr>);
    td = [];
  }
  for (let c = rows[rows.length - 1] + 1; c < block.nodes.length; c++) {
    td.push(
      <td className="border border-black p-1" key={`td-${block.index}.${c}`}>
        {parseNode(block.nodes[c])}
      </td>
    );
  }
  tr.push(<tr key={`tr-${block.index}.${block.index}`}>{td}</tr>);

  return (
    <table key={"table" + block.index} className="my-2">
      <thead>
        <tr>{th}</tr>
      </thead>
      <tbody>{tr}</tbody>
    </table>
  );
}
function parseYaml(block: MdBlock) {
  const tokens = block.style.split("\n");
  const title = tokens[0].split(":")[1].trim();
  const updated = tokens[2].split(":")[1].trim();
  const author = tokens[3].split(":")[1].trim();
  const hero = tokens[4].split(":")[1].split("public")[1];

  return (
    <header className="w-full mx-auto">
      <Image
        className="mx-auto"
        src={hero}
        alt={`${title} hero`}
        width={800}
        height={250}
      ></Image>
      <p className="text-[#fffff40] text-sm">{author}</p>
      <p className="text-[#fffff40] text-sm">{updated}</p>
      <H1 className="text-center font-semibold">{title}</H1>
    </header>
  );
}
