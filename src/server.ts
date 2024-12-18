import express from "express";
import "express-async-errors";

const app = express();

app.get("/", (req, res) => {
  res.json({ hello: "Hi!!!" });
});

app.listen({ port: 3000 }, () => {
  console.log("Express listening on port 3000!");
});
