import { getMeta } from "@/action/journal.action";
import JournalHeader from "@/components/journals/JournalHeader";
import JournalIndex from "@/components/journals/JournalIndex";
import fetchFile from "@/lib/fetchFile";

import { notFound } from "next/navigation";
import { ReactNode } from "react";
export default async function JounralEntryLayout({
  children,
  params,
  intro,
  rest,
}: {
  children: React.ReactNode;
  intro: React.ReactNode;
  rest: React.ReactNode;
  params: { slug: string };
}) {
  const file = fetchFile(`src/content/journals/json/${params.slug}/index.json`);
  if (!file) throw notFound();
  const indexObj = await JSON.parse(file);
  const meta = await getMeta(params.slug);
  if (!meta) throw notFound();
  return (
    <div className="">
      <JournalIndex sections={indexObj}></JournalIndex>
      <main className="p-2 flex-grow sm:pl-32 xl:pl-56">
        <JournalHeader meta={meta}></JournalHeader>
        <article className="max-w-4xl mx-auto pt-10">
          {intro}
          {rest}
        </article>
      </main>
    </div>
  );
}
