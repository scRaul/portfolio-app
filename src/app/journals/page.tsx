import { H2, H4 } from "@/components/Text";
import JounralEntry, {
  JounralEntryProps,
} from "@/components/journals/JournalEntry";
import data from "@/_content/journals/journals.json";

export default async function Journals() {
  const entries: JounralEntryProps[] = [];

  for (let i = 0; i < data.journals.length; i++) {
    entries.push({ slug: data.journals[i], metadata: data.metadata[i] });
  }

  return (
    <>
      <header className="w-full p-1 pt-5 border-black shadow-sm shadow-black">
        <H2 className="whitespace-break-spaces font-bold uppercase w-fit mx-auto">
          Computer Science Entries
        </H2>
        <H4 className="whitespace-break-spaces font-medium p-1 uppercase w-fit mx-auto">
          notes on computer sceince and related topics
        </H4>
      </header>
      <main className="flex w-full p-10 flex-col md:flex-row flex-wrap">
        {entries.map((entry, index) => (
          <JounralEntry key={index} {...entry} />
        ))}
      </main>
    </>
  );
}
