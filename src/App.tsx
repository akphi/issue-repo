import { useEffect, useRef } from "react";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import "react-reflex/styles.css";

const App = (props: {}) => {
  const ref = useRef<HTMLDivElement>(null);
  console.log("ref", ref);

  useEffect(() => {
    console.log(ref.current); // this will be null
  }, []);

  return (
    <ReflexContainer orientation="vertical">
      <ReflexElement className="left-pane">
        <div ref={ref} className="pane-content">
          Left Pane (resizeable)
        </div>
      </ReflexElement>

      <ReflexSplitter />

      <ReflexElement className="right-pane">
        <div className="pane-content">Right Pane (resizeable)</div>
      </ReflexElement>
    </ReflexContainer>
  );
};

export default App;
