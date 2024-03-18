import React, { useState } from "react";

import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

SyntaxHighlighter.registerLanguage("jsx", jsx);
interface CodeProps {
  code: string | null;
  className?: string;
  disableNumbers?: boolean;
}

function Code(props: CodeProps) {
  const code = props.code ? props.code : "unable to retrive code";
  const enableNumbers = props.disableNumbers ? !props.disableNumbers : true;

  return (
    <SyntaxHighlighter
      showLineNumbers={enableNumbers}
      language={"jsx"}
      style={coldarkDark}
    >
      {code}
    </SyntaxHighlighter>
  );
}

export default Code;
