import Link from "next/link";
import { H4 } from "../Text";
import Image from "next/image";

export interface JounralEntryProps {
  title: string;
  thumbnail: string;
  alt: string;
  slug: string;
  public: boolean;
}

export default function JounralEntry(props: JounralEntryProps) {
  return (
    <Link href={props.slug} className="p-2 cursor-pointer">
      <H4 className="font-serif pb-5">{props.title}</H4>
      <Image
        src={props.thumbnail}
        alt={props.alt}
        width={250}
        height={200}
        className="rounded-md mx-auto shadow-md"
      ></Image>
    </Link>
  );
}
