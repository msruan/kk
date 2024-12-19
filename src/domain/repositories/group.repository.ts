import { Group } from "../entities/group";
import { Participant } from "../entities/participant";

export interface IGroupRepository {
  create(payload: GroupCreateParams): Promise<Group>;
  updateById(id: number, payload: GroupEditParams): Promise<Group>;
  findById(id: number): Promise<Group>;
}

export type GroupCreateParams = Omit<Group, "id" | "drawStatus">;
export interface GroupEditParams {
  drawStatus: "done" | "pending";
}
export type ParticipantCreateParams = Omit<Participant, "id"> & {
  groupId: number;
};
