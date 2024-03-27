import { getMeta } from "@/action/journal.actions";
import JournalHeader from "@/components/journals/JournalHeader";
import JournalIndex from "@/components/journals/JournalIndex";
import fetchFile from "@/lib/fetchFile";
import { notFound } from "next/navigation";
export default async function JounralEntryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const file = fetchFile(`src/_content/journals/${params.slug}/_index.json`);
  if (!file) throw notFound();
  const indexObj = await JSON.parse(file);
  const meta = await getMeta(params.slug);
  if (!meta) throw notFound();
  return (
    <>
      <main className="flex pt-10">
        <JournalIndex slug={params.slug} pages={indexObj.pages}></JournalIndex>
        <div className="flex-grow px-5">{children}</div>
      </main>
    </>
  );
}
