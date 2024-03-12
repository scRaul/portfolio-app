interface MathProps {
  className?: string;
}

export default function Math(props: MathProps) {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl text-blue-500 my-2"> Math</h1>
    </div>
  );
}
