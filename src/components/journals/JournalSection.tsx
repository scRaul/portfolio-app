import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import Image from "next/image";
import { ReactNode } from "react";
import { H1, H2, H3, H4, H5, H6 } from "@/components/Text";
import { randomUUID } from "crypto";
import CodeBlock from "@/components/CodeBlock";
import {
  MDBlock,
  ImgMd,
  HeadingMd,
  TextMd,
  LinkMd,
  ListMd,
} from "@/lib/encoder/parser";
import Link from "next/link";

export default async function JounralSection({
  section,
}: {
  section: MDBlock[];
}) {
  const nodes = section.map(parseBlock);
  return <section className="pt-1 pl-2 w-full">{nodes}</section>;
}
function parseBlock(block: MDBlock) {
  if (block.type == "heading") {
    return (
      <JounralHeading
        heading={block.data}
        key={"jh-" + randomUUID()}
      ></JounralHeading>
    );
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
    return <p key={"p-" + randomUUID()}>{pNodes}</p>;
  }
  if (block.type == "mathblock") {
    const { meta, value } = block.data;
    return <BlockMath key={"mb-" + randomUUID()}>{value}</BlockMath>;
  }
  if (block.type == "code") {
    const { lang, meta, value } = block.data;
    return (
      <CodeBlock
        lang={lang}
        code={value}
        key={"code-" + randomUUID()}
      ></CodeBlock>
    );
  }
  if (block.type == "image") {
    var img: ImgMd = block.data;
    img.url = img.url.replace("/public", "");
    return (
      <Image
        src={img.url}
        alt={img.alt}
        width={300}
        height={150}
        key={"img-" + randomUUID()}
      ></Image>
    );
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
          tbody.push(<tr key={"tr-" + randomUUID()}>{trow}</tr>);
          trow = [];
        }
      } else {
        const col = row.data.map(getJText);
        if (doneHeader)
          trow.push(
            <td
              key={"td-" + randomUUID()}
              className="border border-black text-center px-2"
            >
              {col}
            </td>
          );
        else
          thead.push(
            <th key={"th-" + randomUUID()} className="border border-black">
              {col}
            </th>
          );
      }
    });
    return (
      <table key={"table-" + randomUUID()} className="mx-auto my-2">
        <thead>
          <tr>{thead}</tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>
    );
  }
  return <p>{block.type}</p>;
}

function JounralHeading({ heading }: { heading: HeadingMd }) {
  const values = heading.text.map(getJText);
  const tokens: string[] = [];

  const id = heading.id;
  switch (heading.depth) {
    case 2:
      return (
        <H2 id={id} className="font-semibold">
          {values}
        </H2>
      );
    case 3:
      return (
        <div className="flex gap-2 items-baseline" key={"h3-" + randomUUID()}>
          <div className="w-3 h-4 bg-red-500"></div>
          <H3 id={id} className="font-semibold">
            {values}
          </H3>
        </div>
      );
    case 4:
      return (
        <H4 id={id} key={"Hh-" + randomUUID()} className="font-semibold">
          {values}
        </H4>
      );
    case 5:
      return (
        <H5 id={id} key={"Hh-" + randomUUID()} className="font-semibold">
          {values}
        </H5>
      );
    case 6:
      return (
        <H6 id={id} key={"Hh-" + randomUUID()} className="font-semibold">
          {values}
        </H6>
      );
    default:
      return (
        <p id={id} key={"Hh-" + randomUUID()}>
          {values}
        </p>
      );
  }
}
function getJText(text: TextMd) {
  switch (text.style) {
    case "text":
      return (
        <span className="" key={"text-" + randomUUID()}>
          {text.value}
        </span>
      );
    case "strong":
      return (
        <span className="font-bold" key={"text-" + randomUUID()}>
          {text.value}
        </span>
      );
    case "emphasis":
      return (
        <span className="italic" key={"text-" + randomUUID()}>
          {text.value}
        </span>
      );
    case "inlinemath":
      return <InlineMath key={"text-" + randomUUID()}>{text.value}</InlineMath>;
    case "emphasis-strong":
      return (
        <span className="italic font-bold" key={"text-" + randomUUID()}>
          {text.value}
        </span>
      );
  }
}
function getLink(link: LinkMd) {
  if (link.url[0] == "#") {
    return (
      <Link href={link.url} key={"link-" + randomUUID()}>
        {link.title}
      </Link>
    );
  }
  return (
    <a
      href={link.url}
      target="_blank"
      className="text-blue-500 underline"
      key={"a-" + randomUUID()}
    >
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
    else listNodes.push(<li key={"li" + randomUUID()}>{line}</li>);
    nested = false;
    line = [];
  });
  const padding = index * 20;
  if (list.style == "ol") {
    return (
      <ol
        className="list-decimal list-inside"
        style={{ marginLeft: padding }}
        key={"ol-" + randomUUID()}
      >
        {listNodes}
      </ol>
    );
  } else {
    return (
      <ul
        className="list-disc list-inside"
        style={{ marginLeft: padding }}
        key={"ul-" + randomUUID()}
      >
        {listNodes}
      </ul>
    );
  }
}
