import { getBlogMetas } from "@/action/blog.actions";
import BlogEntry from "@/components/blog/BlogEntry";

export default async function Blog() {
  const metas = await getBlogMetas();
  console.log(metas);
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
      {metas.map((meta, index) => (
        <BlogEntry meta={meta}></BlogEntry>
      ))}
    </main>
  );
}
