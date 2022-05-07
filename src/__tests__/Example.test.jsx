import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";

import {
  render,
  findByDisplayValue,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";

export class Data {
  text = "";

  constructor(text) {
    makeObservable(this, {
      text: observable,
      setText: observable,
    });

    this.text = text;
  }

  setText(val) {
    this.text = val;
  }
}

const data = new Data("val1");

export const Example = observer(() => {
  const onChange = (event) => {
    data.setText(event.target.value);
  };
  return <input onChange={onChange} value={data.text} />;
});

test("example", async () => {
  const renderResult = render(<Example />);
  const input = await waitFor(() =>
    findByDisplayValue(renderResult.container, "val1")
  );
  act(() => {
    fireEvent.change(input, { targer: { value: "newVal2" } });
    // data.setText("newVal2");
  });
  await waitFor(() => findByDisplayValue(renderResult.container, "newVal2"));
});
