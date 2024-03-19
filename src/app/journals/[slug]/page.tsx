import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import {
  MdBlock,
  MdNode,
  MdValue,
  getMarkdownBlocks,
} from "@/lib/encoder/parser2";
import Image from "next/image";
import { ReactNode } from "react";
import { H2, H3, H4, H5, H6 } from "@/components/Text";
import { randomUUID } from "crypto";
import CodeBlock from "@/components/CodeBlock";

export default async function JounralPage({
  params,
}: {
  params: { slug: string };
}) {
  const blocks = await getMarkdownBlocks(
    "src/content/journals/md/operatingsystems.md"
  );
  const reactNodes: ReactNode[] = blocks.map(parseBlock);
  return (
    <article className="pt-10 pl-2">
      <header className=""></header>
      <section className=" pl-4 pt-4 pb-20">
        <div className="flex-grow max-w-xl">{reactNodes}</div>
        <aside></aside>
      </section>
    </article>
  );
}
function parseBlock(block: MdBlock): ReactNode {
  if (block.type == "table") {
    const [th, tr] = parseTable(block);
    return (
      <table key={"table" + block.index}>
        <thead>{th}</thead>
        <tbody>{tr}</tbody>
      </table>
    );
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
          <H3 className="font-semibold" key={"h-" + block.index}>
            {reactNodes}
          </H3>
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
  return reactNodes;
}

function parseNode(node: MdNode): ReactNode {
  if (node.type == "image") {
    const url = node.values[0].value.split("/public")[1];
    const title = node.values[1].value;
    const alt = node.values[2].value;
    return (
      <div key={`img-${randomUUID()}`}>
        <Image src={url} alt={alt} width={500} height={500} />
        <p className="text-blue-800 ">{title}</p>
      </div>
    );
  }
  var reactNodes: ReactNode[] = [];
  node.values.forEach((value) => {
    reactNodes.push(parseValue(value));
  });

  if (node.type[0] == "l") {
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
    return <BlockMath>{value.value}</BlockMath>;
  } else if (value.style == "math") {
    return <InlineMath>{value.value}</InlineMath>;
  } else {
    var className = "pr-2";
    if (value.style == "emphasis") className += "italic";
    else if (value.style == "strong") className += "font-extrabold";
    return (
      <span className={className} key={`sp-${randomUUID()}`}>
        {value.value}
      </span>
    );
  }
}

function parseHeader(block: MdBlock) {}

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
      <th className="border border-black">{parseNode(block.nodes[i])}</th>
    );
  }
  var tr: ReactNode[] = [];
  var td: ReactNode[] = [];
  var r = 0;
  for (let r = 0; r < rows.length - 1; r++) {
    for (let c = rows[r] + 1; c < rows[r + 1]; c++) {
      td.push(
        <td className="border border-black p-1">{parseNode(block.nodes[c])}</td>
      );
    }
    tr.push(<tr>{td}</tr>);
    td = [];
  }
  for (let c = rows[rows.length - 1] + 1; c < block.nodes.length; c++) {
    td.push(
      <td className="border border-black p-1">{parseNode(block.nodes[c])}</td>
    );
  }
  tr.push(<tr>{td}</tr>);
  return [th, tr];
}
