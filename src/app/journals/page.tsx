import data from "@/_content/journals/journals.json";
import { H1 } from "@/components/Text";
import JounralEntry from "@/components/journals/JournalEntry";
export default async function Page() {
  const journals = data.metadata;
  return (
    <main className="w-full h-full">
      <header className="border-black px-2 w-fit mx-auto">
        <H1 className="font-bold pt-5">Computer Journals</H1>
        <p>A place to keep my computer science and related content</p>
      </header>
      <section className="flex flex-wrap  pt-10 justify-center">
        {journals.map((entry, index) => (
          <JounralEntry metadata={entry} key={index}></JounralEntry>
        ))}
      </section>
    </main>
  );
}
