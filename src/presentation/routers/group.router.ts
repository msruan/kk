import { Application } from "express";
import { BaseRouter } from "./base.router";
import { GroupController } from "../controllers/group.controller";
import { container } from "tsyringe";

export class GroupRouter extends BaseRouter {
  constructor(app: Application, name: string) {
    super(app, name);
  }

  configureRoutes(): void {
    const controller = container.resolve(GroupController);

    this.app.post("/groups", (req, res) => controller.create(req, res)); //Todo: se eu tirar a arrow, morre
    this.app.post("/groups/:pk/join", (req, res) => controller.join(req, res)); //Todo: se eu tirar a arrow, morre
    this.app.post("/groups/:pk/draw", (req, res) => controller.draw(req, res)); //Todo: se eu tirar a arrow, morre
  }
}
