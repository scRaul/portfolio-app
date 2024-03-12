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
  const json = fetchFile(`src/content/journals/json/${params.slug}/index.json`);
  if (!json) throw notFound();
  const data = await JSON.parse(json);
  return (
    <div className="flex-1 flex">
      <JournalIndex title={data.title} sections={data.sections}></JournalIndex>
      <main className="p-2i flex-grow">{children}</main>
    </div>
  );
}
