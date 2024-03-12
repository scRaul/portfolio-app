import fetchFile from "@/lib/fetchFile";
import { IJournalContent } from "@/lib/interfaces/journals";
import "katex/dist/katex.min.css";
import { notFound } from "next/navigation";
import { InlineMath, BlockMath } from "react-katex";
import Markdown from "markdown-to-jsx";
import { H2 } from "@/components/Text";

export default async function JounralPage({
  params,
}: {
  params: { slug: string };
}) {
  const json = fetchFile(`src/content/journals/json/${params.slug}/intro.json`);
  if (!json) throw notFound();
  const data = await JSON.parse(json);

  return (
    <article className="pt-10 pl-2">
      <header className="flex items-baseline">
        <div className="w-4 h-8 bg-red-500"></div>
        <H2 className="">{data.title}</H2>
      </header>
      <section className="flex pl-4 pt-4">
        <div className="flex-grow max-w-xl">
          {data.content.map((line: IJournalContent, index: number) => (
            <>
              <Markdown key={index}>{line.text}</Markdown>
              <br></br>
            </>
          ))}
        </div>
        <aside></aside>
      </section>
    </article>
  );
}
