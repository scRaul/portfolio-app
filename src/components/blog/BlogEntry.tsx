import { IBlogMeta } from "@/lib/interfaces/blogs";
import Image from "next/image";
import Link from "next/link";
interface BlogEntryProps {
  meta: IBlogMeta;
}

export default function BlogEntry(props: BlogEntryProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <Image
        src={props.meta.hero}
        alt="Blog Post Image"
        width={600}
        height={400}
      />
      <div className="p-6">
        <span className="text-gray-400">{props.meta.createdAt}</span>
        <h2 className="text-xl font-bold mt-2">{props.meta.title}</h2>
        <p className="text-gray-700 mt-2">{props.meta.description}</p>
        <Link
          href={`/blog/${props.meta.slug}`}
          className="block mt-4 text-blue-500 hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
