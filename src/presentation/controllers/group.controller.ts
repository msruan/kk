import { container, injectable } from "tsyringe";
import { GroupService } from "../../application/group.service";
import {
  GroupCreateParams,
  ParticipantCreateParams,
} from "../../domain/repositories/group.repository";
import { Request, Response } from "express";
import { Participant } from "../../domain/entities/participant";

@injectable()
export class GroupController {
  constructor(private groupService: GroupService) {}

  public async create(req: Request, res: Response) {
    const payload: GroupCreateParams = req.body;
    const createdGroup = await this.groupService.create(payload);
    res.json(createdGroup).status(201);
  }

  public async join(req: Request, res: Response) {
    const body = req.body; //Todo: type this
    const newParticipant = await this.groupService.join({
      groupId: parseInt(req.params.pk),
      payload: body,
    });
    res.json(newParticipant).status(201);
  }

  public async draw(req: Request, res: Response) {
    const groupId = parseInt(req.params.pk)
    const updatedParticipants = await this.groupService.draw(groupId);
    console.log(updatedParticipants)
    // const body = updatedParticipants.map((participant)=>participantToDTO)
    res.json(updatedParticipants).status(201);
  }
}

export default container.resolve(GroupController);
