import { JournalMeta } from "@/lib/interfaces/journals";
import Image from "next/image";
import { H1 } from "../Text";

export default function JournalHeader({ meta }: { meta: JournalMeta }) {
  const src = meta.hero.replace("/public", "");
  const updated = meta.updatedAt;
  return (
    <header className="w-fit mx-auto">
      <small className="text-[#00000080]">{`Updated: ${updated}`}</small>
      <H1 className="font-semibold">{meta.title}</H1>
      <p className="text-[#fffff40] text-sm">{meta.author}</p>
      <Image
        className="mx-auto"
        src={src}
        alt={meta.title}
        width={800}
        height={250}
      ></Image>
    </header>
  );
}
