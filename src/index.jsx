import { createRoot } from "react-dom/client";
import { Example } from "./Example.jsx";

const root = (() => {
  let rootElement = document.getElementsByTagName("root").length
    ? document.getElementsByTagName("root")[0]
    : undefined;
  if (!rootElement) {
    rootElement = document.createElement("root");
    document.body.appendChild(rootElement);
  }
  return rootElement;
})();

createRoot(root).render(<Example />);
