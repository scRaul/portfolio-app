import { IJournalContent } from "@/lib/interfaces/journals";

interface JournalIndexProps {
  title: string;
  sections: IJournalContent[];
}

export default function JournalIndex(props: JournalIndexProps) {
  return (
    <div className=" bg-[#00000055] p-2 hidden md:block w-48">
      <h1 className="font-bold underline py-2">{props.title}</h1>
      {props.sections.map((section, index) => (
        <p
          key={index}
          className="p-1 hover:bg-[#00000033] cursor-pointer font-medium"
        >
          {section}
        </p>
      ))}
    </div>
  );
}
