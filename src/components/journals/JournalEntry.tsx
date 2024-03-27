import Link from "next/link";
import { H4 } from "../Text";
import Image from "next/image";
import { JournalMeta } from "@/lib/interfaces/journals";

export interface JounralEntryProps {
  metadata: JournalMeta;
}

export default function JounralEntry(props: JounralEntryProps) {
  const title = props.metadata.title;
  return (
    <Link
      href={`/journals/${props.metadata.slug}`}
      className="p-2 cursor-pointer"
    >
      <H4 className="font-serif pb-5 w-[250px] mx-auto">{title}</H4>
      <Image
        src={props.metadata.hero}
        alt={"jounral entry"}
        width={250}
        height={200}
        className="rounded-md mx-auto shadow-md shadow-black"
      ></Image>
    </Link>
  );
}
