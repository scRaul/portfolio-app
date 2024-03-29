import JounralSection from "@/components/journals/JournalSection";
import { parseMarkdown } from "@/lib/parser/parser";
export default await function Page({ params }: { params: { slug: string } }) {
  const file = `src/_content/journals/${params.slug}/intro.md`;
  const article = parseMarkdown(file, { title: "", updated: "", layout: "" });
  return (
    <article>
      {article.section.map((sec, index) => (
        <JounralSection section={sec} key={index}></JounralSection>
      ))}
    </article>
  );
};
