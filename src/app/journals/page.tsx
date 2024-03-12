import { H2, H4 } from "@/components/Text";
import data from "@/content/journals/journals.json";
import JounralEntry from "@/components/journals/JournalEntry";

export default function Journals() {
  return (
    <>
      <header className="w-full p-1 pt-5 border-black shadow-sm shadow-black ">
        <H2 className="whitespace-normal font-bold uppercase md:text-center">
          Computer Science Entries
        </H2>
        <H4 className="whitespace-normal font-medium p-1 uppercase md:text-center">
          notes on computer sceince and related topics
        </H4>
      </header>
      <main className="flex w-full p-10 flex-col md:flex-row">
        {data.journals.map((entry, index) => (
          <JounralEntry key={index} {...entry} />
        ))}
      </main>
    </>
  );
}
