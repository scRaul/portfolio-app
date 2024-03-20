import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import Image from "next/image";
import { ReactNode } from "react";
import { H1, H2, H3, H4, H5, H6 } from "@/components/Text";
import { randomUUID } from "crypto";
import CodeBlock from "@/components/CodeBlock";
import {
  parseMarkdown,
  MDBlock,
  ImgMd,
  HeadingMd,
  TextMd,
  LinkMd,
  ListMd,
} from "@/lib/encoder/parser";
import Link from "next/link";
import { table } from "console";

interface JournalMeta {
  title: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  hero: string;
  published: boolean;
}

export default async function JounralPage({
  params,
}: {
  params: { slug: string };
}) {
  const blocks: MDBlock[] = parseMarkdown(
    `src/content/journals/md/networking.md`,
    {
      title: "",
      createdAt: "",
      updatedAt: "",
      author: "",
      hero: "",
      published: false,
    }
  );
  const article: ReactNode[] = blocks.map(parseBlock);
  // return <p>a</p>;
  return <article className="pt-1 pl-2 w-full">{article}</article>;
}
function parseBlock(block: MDBlock) {
  if (block.type == "yaml") {
    const meta: JournalMeta = block.data;
    return <JounralMeta meta={meta}></JounralMeta>;
  }
  if (block.type == "heading") {
    return <JounralHeading heading={block.data}></JounralHeading>;
  }
  if (block.type == "paragraph") {
    const pNodes: ReactNode[] = [];
    block.data.forEach((element: any) => {
      if ("style" in element) {
        pNodes.push(getJText(element));
      } else if ("url" in element) {
        pNodes.push(getLink(element));
      }
    });
    return <p>{pNodes}</p>;
  }
  if (block.type == "mathblock") {
    const { meta, value } = block.data;
    return <BlockMath>{value}</BlockMath>;
  }
  if (block.type == "code") {
    const { lang, meta, value } = block.data;
    return <CodeBlock lang={lang} code={value}></CodeBlock>;
  }
  if (block.type == "image") {
    var img: ImgMd = block.data;
    img.url = img.url.replace("/public", "");
    return <Image src={img.url} alt={img.alt} width={300} height={150}></Image>;
  }
  if (block.type == "list") {
    const list: ListMd = block.data;
    return JounralList(list, 0);
  }
  if (block.type == "table") {
    var thead: ReactNode[] = [];
    var tbody: ReactNode[] = [];
    var trow: ReactNode[] = [];
    let doneHeader = false;
    block.data.forEach((row: any) => {
      if (row.style == "tr") {
        if (!doneHeader) doneHeader = true;
        else {
          tbody.push(<tr>{trow}</tr>);
          trow = [];
        }
      } else {
        console.log(row);
        const col = row.data.map(getJText);
        if (doneHeader)
          trow.push(<td className="border border-black">{col}</td>);
        else thead.push(<th className="border border-black">{col}</th>);
      }
    });
    return (
      <table>
        <thead>
          <tr>{thead}</tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>
    );
  }
  return <p>{block.type}</p>;
}

function JounralMeta({ meta }: { meta: JournalMeta }) {
  const src = meta.hero.replace("/public", "");
  return (
    <header className="w-full mx-auto">
      <Image
        className="mx-auto"
        src={src}
        alt={meta.title}
        width={800}
        height={250}
      ></Image>
      <p className="text-[#fffff40] text-sm">{meta.author}</p>
      <p className="text-[#fffff40] text-sm">{meta.updatedAt}</p>
      <H1 className="text-center font-semibold">{meta.title}</H1>
    </header>
  );
}
function JounralHeading({ heading }: { heading: HeadingMd }) {
  const values = heading.text.map(getJText);
  const tokens: string[] = [];
  heading.text.forEach((txt) => {
    const words = txt.value.split(" ");
    words.forEach((word) => {
      tokens.push(word.trim());
    });
  });
  const id = tokens.join("-").toLowerCase();
  switch (heading.depth) {
    case 2:
      return (
        <H2 id={id} className="font-semibold">
          {values}
        </H2>
      );
    case 3:
      return (
        <div className="flex gap-2 items-baseline">
          <div className="w-3 h-4 bg-red-500"></div>
          <H3 id={id} className="font-semibold">
            {values}
          </H3>
        </div>
      );
    case 4:
      return (
        <H4 id={id} className="font-semibold">
          {values}
        </H4>
      );
    case 5:
      return (
        <H5 id={id} className="font-semibold">
          {values}
        </H5>
      );
    case 6:
      return (
        <H6 id={id} className="font-semibold">
          {values}
        </H6>
      );
    default:
      return <p id={id}>{values}</p>;
  }
}
function getJText(text: TextMd) {
  switch (text.style) {
    case "text":
      return <span className="">{text.value}</span>;
    case "strong":
      return <span className="font-bold">{text.value}</span>;
    case "emphasis":
      return <span className="italic">{text.value}</span>;
    case "inlinemath":
      return <InlineMath>{text.value}</InlineMath>;
    case "emphasis-strong":
      return <span className="italic font-bold">{text.value}</span>;
  }
}
function getLink(link: LinkMd) {
  if (link.url[0] == "#") {
    return <Link href={link.url}>{link.title}</Link>;
  }
  return (
    <a href={link.url} target="_blank" className="text-blue-500 underline">
      {link.title}
    </a>
  );
}
function JounralList(list: ListMd, index: number) {
  const listNodes: ReactNode[] = [];
  list.data.forEach((listItem: any) => {
    let line: ReactNode[] = [];
    var nested = false;
    listItem.forEach((item: any) => {
      if ("url" in item) line.push(getLink(item));
      if ("style" in item) line.push(getJText(item));
      else if (Array.isArray(item)) {
        nested = true;
        const templist = { style: list.style, data: [item] };
        line.push(JounralList(templist, index + 1));
      }
    });
    if (nested) listNodes.push(line);
    else listNodes.push(<li>{line}</li>);
    nested = false;
    line = [];
  });
  const padding = index * 20;
  if (list.style == "ol") {
    return (
      <ol className="list-decimal list-inside" style={{ marginLeft: padding }}>
        {listNodes}
      </ol>
    );
  } else {
    return (
      <ul className="list-disc list-inside" style={{ marginLeft: padding }}>
        {listNodes}
      </ul>
    );
  }
}
