import Link from "next/link";

interface JournalIndexProps {
  slug: string;
  pages: string[];
}

export default function JournalIndex(props: JournalIndexProps) {
  const intro = props.pages.splice(0, 1)[0];
  const className =
    "whitespace-break-spaces hover:text-blue-600 cursor-pointer font-medium tracking-tighter my-2 leading-tight block";
  return (
    <div className="hidden sm:block px-2 border-r-2">
      <Link href={`/journals/${props.slug}`} className={className}>
        Introduction
      </Link>
      {props.pages.map((page, index) => (
        <Link
          href={`/journals/${props.slug}/${page
            .split(" ")
            .join("-")
            .toLowerCase()}`}
          key={index}
          className={className}
        >
          {page}
        </Link>
      ))}
    </div>
  );
}
