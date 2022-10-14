import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";

const PORT = 9999;

const server = fastify({
  logger: true,
});

server.register(fastifyCors, {
  methods: ["OPTIONS"],
  origin: [/localhost/],
  credentials: true,
});

server.listen(
  {
    port: PORT,
  },
  (error, address) => {
    if (error) {
      throw error;
    }
  }
);
