import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark as style } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeProps {
  code: string | null;
  language: string;
  className?: string;
  disableNumbers?: boolean;
}

export default function Code(props: CodeProps) {
  const code = props.code ? props.code : "unable to retrive code";
  const enableNumbers = props.disableNumbers ? !props.disableNumbers : true;

  return (
    <SyntaxHighlighter language={props.language} style={style}>
      {code}
    </SyntaxHighlighter>
  );
}
