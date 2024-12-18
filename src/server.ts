import { fastify } from "fastify";

const app = fastify({ logger: true });

app.get("/", (req, res) => {
  return { hello: "Hi!!!" };
});

app.listen({ port: 3000 });
