import JournalHeader from "@/components/journals/JournalHeader";
import JounralSection from "@/components/journals/JournalSection";
import { IBlogMeta } from "@/lib/interfaces/blogs";
import { parseMarkdown } from "@/lib/parser/parser";

export default function BlogArticle({ params }: { params: { slug: string } }) {
  const file = `src/_content/blogs/${params.slug}.md`;
  const b: IBlogMeta = {
    createdAt: "",
    title: "",
    description: "",
    hero: "",
    slug: "",
  };
  const article = parseMarkdown(file, b);
  return (
    <article className="p-10">
      {article.section.map((sec, index) => (
        <JounralSection section={sec} key={index}></JounralSection>
      ))}
    </article>
  );
}
