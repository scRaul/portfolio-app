import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import {
  MdBlock,
  MdData,
  MdNode,
  getMarkdownBlocks,
} from "@/lib/encoder/parser";
import Image from "next/image";
import { ReactNode } from "react";
import { H2, H3, H4, H5, H6 } from "@/components/Text";
import { randomUUID } from "crypto";

export default async function JounralPage({
  params,
}: {
  params: { slug: string };
}) {
  const blocks = await getMarkdownBlocks("src/content/journals/md/math.md");
  const reactNodes = getReactNodes(blocks);
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
function getReactNodes(blocks: MdBlock[]): ReactNode[] {
  var reactNode: ReactNode[] = [];
  blocks.forEach((block, index) => {
    const key = "b-" + index;
    reactNode.push(
      <WrapNodes block={[block.block, key]} key={key}>
        {block.node}
      </WrapNodes>
    );
  });
  return reactNode;
}

function WrapNodes({
  children,
  block,
}: {
  children: MdNode[];
  block: [string, string];
}) {
  if (children.length <= 0) return;
  const nodes: ReactNode[] = [];
  children.forEach((child, index) => {
    nodes.push(
      <WrapNode key={block[1] + index} node={child} id={block[1]}></WrapNode>
    );
  });
  if (block[0].includes("heading")) {
    const size = block[0][block[0].length - 1];
    if (size == "2") {
      return <H2 className="font-bold">{nodes}</H2>;
    }
    if (size == "3") {
      return <H3 className="font-bold">{nodes}</H3>;
    }
    if (size == "4") {
      return <H4 className="font-bold">{nodes}</H4>;
    }
    if (size == "5") {
      return <H5 className="font-bold">{nodes}</H5>;
    }
    if (size == "6") {
      return <H6 className="font-bold">{nodes}</H6>;
    }
  }
  if (block[0] == "paragraph") {
    return <p>{nodes}</p>;
  }
  if (block[0] == "mblock") {
    const key = block[1] + "-mb";
    return <BlockMath key={key}>{children[0].data[0].data}</BlockMath>;
  }
  if (block[0] == "ol" || block[0] == "ul") {
    const key = block[1] + "list";
    const className = block[0] == "ol" ? "list-decimal" : "list-disc";
    return (
      <ul className={className} key={key}>
        {nodes}
      </ul>
    );
  }
  if (block[0] == "table") {
    const key = block[1] + "-tb";
    var table: ReactNode[][] = [];
    var tableRow: ReactNode[] = [];
    children.forEach((node) => {
      if (node.style == "tableRow") {
        if (tableRow.length > 0) {
          table.push(tableRow);
        }
        tableRow = [];
      }
      tableRow.push(<WrapNode node={node} key={key} id={key} />);
    });
    table.push(tableRow);
    return (
      <table className="border border-collapse border-black" key={key}>
        {table.map((item, index) => (
          <tr key={key + "-tr-" + index} className="border border-black">
            {item}
          </tr>
        ))}
      </table>
    );
  }
}
function WrapNode({ node, id }: { node: MdNode; id: string }) {
  if (node.style == "image") {
    const src = node.data[0].data.split("/public")[1];
    return <Image src={src} alt={node.data[2].data} width={500} height={500} />;
  }
  var className = "";
  if (node.style == "emphasis") className += "italic";
  if (node.style == "strong") className += "font-bold";
  var nodes: ReactNode[] = [];
  node.data.forEach((datum, index) => {
    nodes.push(<WrapData key={index} data={datum} className={className} />);
  });
  if (node.style == "tableRow" || node.style == "tableCell") {
    return (
      <td
        key={`td-${id}-${randomUUID()}`}
        className="border border-black text-center p-2"
      >
        {nodes}
      </td>
    );
  }
  if (node.style.includes("li")) {
    const m = parseInt(node.style.split("-")[1]);
    return (
      <li
        key={`li-${id}-${randomUUID()}`}
        className={className}
        style={{ marginLeft: m * 10 + "px" }}
      >
        {nodes}
      </li>
    );
  }
  return <span>{nodes}</span>;
}
function WrapData({ data, className }: { data: MdData; className: string }) {
  if (data.type === "text") {
    return (
      <span key={data.data} className={className}>
        {data.data}
      </span>
    );
  }
  return <InlineMath key={data.data}>{data.data}</InlineMath>;
}
