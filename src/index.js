import { createModelSchema, primitive, serialize } from "serializr";

class Person {
  name;
}

class Worker extends Person {
  company;
}

// const workerModelSchema = createModelSchema(Worker, {
//   company: primitive(),
//   name: primitive(),
// });
// output: { company: 'FirmX', name: 'John' } --> this works

const personModelSchema = createModelSchema(Person, {
  name: primitive(),
});

const workerModelSchema = createModelSchema(
  Worker,
  {
    company: primitive(),
    name: primitive(),
  },
  () => new Worker()
);
// workerModelSchema.extends = undefined; // this is the workaround that would make it work
// output: { name: 'John', company: 'FirmX' } --> this doesn't work as expected

// const workerModelSchema2 = {
//   factory: () => new Worker(),
//   props: {
//     company: primitive(),
//     name: primitive(),
//   },
// };
// output: { company: 'FirmX', name: 'John' } --> this works

const newWorker = new Worker();
newWorker.name = "John";
newWorker.company = "FirmX";

const json = serialize(Worker, newWorker);

console.log(json);
