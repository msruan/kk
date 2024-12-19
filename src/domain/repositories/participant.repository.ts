import { Participant } from "../entities/participant";

export interface IParticipantRepository {
  create(payload: ParticipantCreateParams): Promise<Participant>;
  findById(id: number): Promise<Participant>
  findMany(query: ParticipantFindQuery): Promise<Participant[]>;
  update(mutation: ParticipantUpdateParams): Promise<Participant>;
}

export type ParticipantFindQuery = { groupId: number };

export type ParticipantCreateParams = Omit<
  Participant,
  "id" | "giftsList" | "password" | "gifted"
>;

export type ParticipantUpdateParams = Omit<Participant, "group">;