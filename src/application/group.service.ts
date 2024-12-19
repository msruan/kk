import {
  GroupCreateParams,
  GroupEditParams,
  IGroupRepository,
  ParticipantCreateParams,
} from "../domain/repositories/group.repository";

import { inject, injectable, registry } from "tsyringe";
import { ArrayGroupRepository } from "../persistence/array/array.group.repository";
import { ArrayParticipantRepository } from "../persistence/array/array.participant.repository";
import { IParticipantRepository } from "../domain/repositories/participant.repository";
import { Participant } from "../domain/entities/participant";

type ParticipantJoinParams = {
  groupId: number;
  payload: Omit<ParticipantCreateParams, "group">;
};

@injectable()
@registry([
  //Todo: search for a best method
  {
    token: "IGroupRepository",
    useClass: ArrayGroupRepository,
  },
  {
    token: "IParticipantRepository",
    useClass: ArrayParticipantRepository,
  },
])
export class GroupService {
  constructor(
    @inject("IGroupRepository")
    private groupRepo: IGroupRepository,
    @inject("IParticipantRepository")
    private participantRepo: IParticipantRepository
  ) {}

  public async create(payload: GroupCreateParams) {
    const createdGroup = await this.groupRepo.create(payload);
    return createdGroup;
  }

  public async update(id: number, payload: GroupEditParams) {
    const updatedGroup = await this.groupRepo.updateById(id, payload);
    return updatedGroup;
  }

  public async getById(id: number) {
    const updatedGroup = await this.groupRepo.findById(id);
    return updatedGroup;
  }

  public async join(params: ParticipantJoinParams) {
    const { groupId, payload } = params;

    const targetGroup = await this.getById(groupId);

    const createParams = {
      group: targetGroup,
      ...payload,
    };

    const createdUser = await this.participantRepo.create(createParams);

    return createdUser;
  }
}
