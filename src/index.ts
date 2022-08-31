import { createModelSchema, primitive } from "serializr";
import { SerializationFactory } from "@finos/legend-shared";

export class A {
  name = "";

  static readonly serialization = new SerializationFactory(
    createModelSchema(A, {
      name: primitive(),
    })
  );
}
