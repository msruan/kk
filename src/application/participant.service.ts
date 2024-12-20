import { inject, injectable, registry } from "tsyringe";
import { ParticipantCreateParams } from "../domain/repositories/group.repository";
import { ArrayParticipantRepository } from "../persistence/array/array.participant.repository";
import { IParticipantRepository } from "../domain/repositories/participant.repository";
import { Participant } from "../domain/entities/participant";

@registry([
  { token: "IParticipantRepository", useClass: ArrayParticipantRepository },
])
@injectable()
export class ParticipantService {
  constructor(
    @inject("IParticipantRepository")
    private participantReppo: IParticipantRepository
  ) {}

  async create(payload: ParticipantCreateParams): Promise<Participant> {
    const createdUser = await this.participantReppo.create(payload);
    return createdUser;
  }
}
