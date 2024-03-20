interface textProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function H1(props: textProps) {
  return (
    <h1 id={props.id} className={`text-4xl md:text-5xl ${props.className}`}>
      {props.children}
    </h1>
  );
}

export function H2(props: textProps) {
  return (
    <h2 id={props.id} className={`text-3xl md:text-4xl ${props.className}`}>
      {props.children}
    </h2>
  );
}
export function H3(props: textProps) {
  return (
    <h3 id={props.id} className={`text-2xl md:text-3xl ${props.className}`}>
      {props.children}
    </h3>
  );
}
export function H4(props: textProps) {
  return (
    <h4 id={props.id} className={`text-xl md:text-2xl ${props.className}`}>
      {props.children}
    </h4>
  );
}
export function H5(props: textProps) {
  return (
    <h5 id={props.id} className={`text-lg md:text-xl ${props.className}`}>
      {props.children}
    </h5>
  );
}
export function H6(props: textProps) {
  return (
    <h6 id={props.id} className={`text-base md:text-lg ${props.className}`}>
      {props.children}
    </h6>
  );
}
