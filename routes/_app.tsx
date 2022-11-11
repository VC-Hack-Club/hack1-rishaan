import { Component as ReactComponent } from "preact";

export default function App(
  { Component }: { Component: typeof ReactComponent },
) {
  return <Component />;
}
