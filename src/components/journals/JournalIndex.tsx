import { TSectionId } from "@/lib/interfaces/markdown";
import Link from "next/link";

interface JournalIndexProps {
  sections: TSectionId[];
}

export default function JournalIndex(props: JournalIndexProps) {
  return (
    <div className="fixed  hidden sm:block overflow-auto h-screen top-0 pt-20 w-32 xl:w-52 px-2 shadow-md shadow-black">
      {props.sections.map((section, index) => (
        <Link
          href={`#${section.id}`}
          key={index}
          className="whitespace-break-spaces hover:text-blue-600 cursor-pointer font-medium tracking-tighter my-2 leading-tight block"
        >
          {section.slug}
        </Link>
      ))}
    </div>
  );
}
