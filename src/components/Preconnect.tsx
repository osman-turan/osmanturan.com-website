import ReactDOM from "react-dom";

interface PreconnectProps {
  href: string;
}

export function Preconnect({ href }: PreconnectProps): JSX.Element | null {
  ReactDOM.preconnect(href);
  ReactDOM.prefetchDNS(href);

  return null;
}
