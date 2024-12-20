import { GroupService } from "../../application/group.service";
import {
  GroupCreateParams,
  ParticipantCreateParams,
} from "../../domain/repositories/group.repository";
import { Request, Response } from "express";
import { Participant } from "../../domain/entities/participant";
import { Group } from "../../domain/entities/group";
import { container, injectable } from "tsyringe";

type GetParticipantsResponse = {
  participant: Omit<Participant, "giftedId"> & { gifted: Participant };
};

type CreateGroupRequest = GroupCreateParams;
type CreateGroupResponse = Group;

type ParticipantJoinRequest = Omit<ParticipantCreateParams, "group">;
type ParticipantJoinResponse = Participant;

type DrawResponse = Participant[];

@injectable()
export class GroupController {
  constructor(private groupService: GroupService) {}

  public async create(req: Request, res: Response) {
    const payload: CreateGroupRequest = req.body;
    const createdGroup = await this.groupService.create(payload);
    res.json(createdGroup as CreateGroupResponse).status(201);
  }

  public async join(req: Request, res: Response) {
    const body: ParticipantJoinRequest = req.body; //Todo: type this
    const newParticipant = await this.groupService.join({
      groupId: parseInt(req.params.pk),
      payload: body,
    });
    res.json(newParticipant as ParticipantJoinResponse).status(201);
  }

  public async draw(req: Request, res: Response) {
    const groupId = parseInt(req.params.pk);
    const updatedParticipants = await this.groupService.draw(groupId);
    res.json(updatedParticipants as DrawResponse).status(201);
  }

  public async getParticipant(req: Request, res: Response) {
    const participantId = parseInt(req.params.pk);
    const participantObject = await this.groupService.getParticipantById(
      participantId
    );
    const { participant, giftedParticipant } = participantObject;
    const { giftedId, ...participantDTO } = participant;

    const body = {
      participant: {
        ...participantDTO,
        gifted: giftedParticipant,
      },
    };

    res.json(body as GetParticipantsResponse).status(200);
  }
}

export default container.resolve(GroupController);
