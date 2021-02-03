import { makeObservable, observable, action } from "mobx";
class Person {
    bio = {
        name: "John",
        age: 12,
    };
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
person.setBio({
    car: "F1",
});
person.freeze();
console.log("asdasd");
//# sourceMappingURL=index.js.map