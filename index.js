const { makeObservable, observable, action } = require("mobx");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      writable: true,
      configurable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class Person {
  bio = [{
    name: 'John',
    age: 12,
  }];

  constructor() {
    makeObservable(this, {
      bio: observable.ref,
      setBio: action,
    });
  }

  setBio(val) {
    this.bio = val;
  }

  freeze() {
    Object.freeze(this.bio);
  }
}

const person = new Person();
person.setBio([
  {
    car: "F1",
  },
  {
    car: "F1",
  },
]);
person.freeze();
console.log("asdasd");
