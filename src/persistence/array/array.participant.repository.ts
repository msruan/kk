import { Participant } from "../../domain/entities/participant";
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

  //Checkpoint: I was doing this to make the draw service
  update(mutation: ParticipantUpdateParams): Promise<Participant[]> {
    throw new Error("Method not implemented.");
  }
}
