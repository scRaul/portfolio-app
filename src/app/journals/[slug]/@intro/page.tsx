import { getIntro } from "@/action/journal.action";
import JournalSection from "@/components/journals/JournalSection";
import { notFound } from "next/navigation";

export default async function IntroPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getIntro(params.slug);
  if (!data) throw notFound();
  return <JournalSection section={data}></JournalSection>;
}
