import { Group } from "../../domain/entities/group";
import { NotFoundException } from "../../domain/errors";
import {
  GroupCreateParams,
  GroupEditParams,
  IGroupRepository,
} from "../../domain/repositories/group.repository";

export class ArrayGroupRepository implements IGroupRepository {
  repository: Group[] = [];

  public create(payload: GroupCreateParams): Promise<Group> {
    const { name, description, celebrationLocal, celebrationDate } = payload;
    const newGroup = new Group(
      this.repository.length,
      name,
      description,
      celebrationLocal,
      celebrationDate
    );
    this.repository.push(newGroup);
    return new Promise((resolve) => resolve(newGroup));
  }

  public async updateById(
    id: number,
    payload: GroupEditParams
  ): Promise<Group> {
    const targetGroup = await this.findById(id);

    updateGroupObject(targetGroup, payload);

    return new Promise((resolve) => resolve(targetGroup));
  }

  public findById(id: number): Promise<Group> {
    const targetGroup = this.repository.find((group) => id === group.id);
    if (!targetGroup) {
      throw new NotFoundException("Group not find");
    }
    return new Promise((resolve) => resolve(targetGroup));
  }
}

function updateGroupObject(
  group: Group,
  updatePayload: GroupEditParams
): Group {
 
  if (updatePayload.drawStatus) {
    group.drawStatus = updatePayload.drawStatus;
  }

  return group;
}
