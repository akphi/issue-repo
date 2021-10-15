import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.scss";

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

ReactDOM.render(<App />, root);
