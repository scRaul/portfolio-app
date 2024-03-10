import { H1, H3, H4, H6 } from "@/components/Text";
import Image from "next/image";
import data from "@/content/journals/journals.json";
import JounralEntry from "@/components/journals/JournalEntry";
export default function Journals() {
  return (
    <>
      <header className="mx-auto w-fit text-center p-1 pt-5 border-b-4 border-black">
        <H1 className="whitespace-normal font-bold">
          Computer Science Jounral Entries
        </H1>
        <H3 className="whitespace-normal font-medium p-1">
          notes on computer sceince and related topics
        </H3>
      </header>
      <main className="flex w-full p-10">
        {data.journals.map((entry, index) => (
          <JounralEntry key={index} {...entry} />
        ))}
      </main>
    </>
  );
}
