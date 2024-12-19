import { Group } from "../../domain/entities/group";
import {
  GroupCreateParams,
  GroupEditParams,
  IGroupRepository,
} from "../../domain/repositories/group.repository";

export class DrizzleGroupRepository implements IGroupRepository {
  create(payload: GroupCreateParams): Promise<Group> {
    throw new Error("Method not implemented.");
  }

  updateById(id: number, payload: GroupEditParams): Promise<Group> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<Group> {
    throw new Error("Method not implemented.");
  }
}
