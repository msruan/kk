import express from "express";
import "express-async-errors";
import "reflect-metadata";
import "./commom/ioc";
import { BaseRouter } from "./presentation/routers/base.router";
import cors from "cors";
import { GroupRouter } from "./presentation/routers/group.router";

const app = express();

app.use(cors());
app.use(express.json());

const routers: BaseRouter[] = [new GroupRouter(app, "Group Routes")];

for (const router of routers) {
  router.configureRoutes();
}

app.listen({ port: 3000 }, () => {
  console.log("Express listening on port 3000!");
});
