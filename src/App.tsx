import { makeObservable, observable, action } from "mobx";

class Person {
  name = '';
  age = 1;

  constructor() {
    makeObservable(this, {
      name: observable,
      setName: action,
    });
  }

  setName(val: string) {
    this.name = val;
  }
}

export const App = (props: {}) => {
  const person = new Person();
  person.setName('initial');
  console.log("person", person, person.name);
  Object.freeze(person);
  person.setName('something');
  // person.age = 3;
  console.log("person", person, person.name);
  return <div>{person.name}</div>;
};
