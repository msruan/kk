import { Application } from "express";

export abstract class BaseRouter {
  protected app: Application;
  protected _name: string;
  protected _prefix: string;

  constructor(app: Application, name: string, prefix: string = "") {
    this.app = app;
    this._name = name;
    this._prefix = prefix;
  }

  abstract configureRoutes(): void;

  public get name(): string {
    return this._name;
  }

  public get prefix(): string {
    return this._prefix;
  }
}
