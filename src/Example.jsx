import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";

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
