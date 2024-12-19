import { Participant } from "../../domain/entities/participant";
import { NotFoundException } from "../../domain/errors";
import {
  IParticipantRepository,
  ParticipantCreateParams,
  ParticipantFindQuery,
  ParticipantUpdateParams,
} from "../../domain/repositories/participant.repository";

export class ArrayParticipantRepository implements IParticipantRepository {
  private repository: Participant[] = [];

  create(payload: ParticipantCreateParams): Promise<Participant> {
    const { nick, email, group } = payload;

    const newParticipant = new Participant(
      this.repository.length,
      nick,
      email,
      null,
      group
    );

    this.repository.push(newParticipant);
    return new Promise((resolve) => resolve(newParticipant));
  }

  findMany(query: ParticipantFindQuery): Promise<Participant[]> {
    let filtereds = this.repository;
    if (query.groupId) {
      filtereds = filtereds.filter(
        (participant) => participant.group.id === query.groupId
      );
    }
    return new Promise((resolve) => resolve(filtereds));
  }

  findById(id: number): Promise<Participant> {
    let target = this.repository.find((participant)=>participant.id === id)

    
    if(!target){
      throw new NotFoundException("Participant not found")
    }

    return new Promise((resolve) => resolve(target));
  }

  async update(mutation: ParticipantUpdateParams): Promise<Participant> {
    let target = await this.findById(mutation.id);

    updateParticipantObject(target, mutation);

    return new Promise((resolve)=>resolve(target))
  }
}

function updateParticipantObject(
  participant: Participant,
  updatePayload: ParticipantUpdateParams
): Participant {
  if (updatePayload.nick) {
    participant.nick = updatePayload.nick;
  }

  if (updatePayload.email) {
    participant.email = updatePayload.email;
  }

  if (updatePayload.giftedId) {
    participant.giftedId = updatePayload.giftedId;
  }

  if (updatePayload.giftsList) {
    participant.giftsList = updatePayload.giftsList;
  }

  return participant;
}
