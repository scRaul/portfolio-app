import { getRest } from "@/action/journal.action";
import JounralSection from "@/components/journals/JournalSection";
import { MDBlock } from "@/lib/encoder/parser";
import { notFound } from "next/navigation";

export default async function ResstPage({
  params,
}: {
  params: { slug: string };
}) {
  const sections = await getRest(params.slug);
  if (!sections) throw notFound();

  return (
    <>
      {sections.map((section: MDBlock[], index) => (
        <JounralSection section={section} key={index}></JounralSection>
      ))}
    </>
  );
}
