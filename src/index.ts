import { createModelSchema, primitive } from "serializr";
import { SerializationFactory } from "@finos/legend-shared";

class A {
  name = "";

  static readonly serialization = new SerializationFactory(
    createModelSchema(A, {
      name: primitive(),
    })
  );
}
