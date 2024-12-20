import { Group } from "../entities/group";
import { Participant } from "../entities/participant";

export interface IParticipantRepository {
  create(payload: ParticipantCreateParams): Promise<Participant>;
  findById(id: number): Promise<Participant>;
  findMany(query: ParticipantFindQuery): Promise<Participant[]>;
  update(mutation: ParticipantUpdateParams): Promise<Participant>;
}

export type ParticipantFindQuery = { groupId: number };

export type ParticipantCreateParams = {
  nick: string;
  email: string | null;
  group: Group;
};

export type ParticipantUpdateParams = {
  id: number;
  giftedId: number | null;
};
