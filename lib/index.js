import { createModelSchema, primitive } from "serializr";
import { SerializationFactory } from "@finos/legend-shared";
class A {
    name = "";
    static serialization = new SerializationFactory(createModelSchema(A, {
        name: primitive(),
    }));
}
//# sourceMappingURL=index.js.map