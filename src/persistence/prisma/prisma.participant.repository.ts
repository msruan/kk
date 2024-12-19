import { PrismaClient } from "@prisma/client";

import {
  IParticipantRepository,
  ParticipantCreateParams,
  ParticipantFindQuery,
  ParticipantUpdateParams,
} from "../../domain/repositories/participant.repository";
import { Participant } from "../../domain/entities/participant";
import { Group } from "../../domain/entities/group";

export class PrismaParticipantRepository implements IParticipantRepository {
  private prisma: PrismaClient = new PrismaClient();

  async create({
    nick,
    email,
    group,
  }: ParticipantCreateParams): Promise<Participant> {
    const participant = await this.prisma.participant.create({
      data: {
        nick,
        email,
        groupId: group.id,
      },
    });

    return new Participant(
      participant.id,
      participant.nick,
      participant.email,
      participant.giftsList,
      group
    );
  }

  async findMany(query: ParticipantFindQuery): Promise<Participant[]> {
    const participants = await this.prisma.participant.findMany({
      where: {
        ...query,
      },
    });

    const group = await this.prisma.group.findUniqueOrThrow({
      where: {
        id: query.groupId,
      },
    });

    const groupObject = new Group(
      group.id,
      group.name,
      group.description,
      group.celebrationLocal,
      group.celebrationDate
    );

    return participants.map(
      (participant) =>
        new Participant(
          participant.id,
          participant.nick,
          participant.email,
          participant.giftsList,
          groupObject
        )
    );
  }

  async findById(id: number): Promise<Participant> {
    const participant = await this.prisma.participant.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const group = await this.prisma.group.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const groupObject = new Group(
      group.id,
      group.name,
      group.description,
      group.celebrationLocal,
      group.celebrationDate
    );

    return new Participant(
      participant.id,
      participant.nick,
      participant.email,
      participant.giftsList,
      groupObject
    );
  }

  async update({ id, ...data }: ParticipantUpdateParams): Promise<Participant> {
    const updatedParticipant = await this.prisma.participant.update({
      where: {
        id,
      },
      data,
    });

    const group = await this.prisma.group.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const groupObject = new Group(
      group.id,
      group.name,
      group.description,
      group.celebrationLocal,
      group.celebrationDate
    );

    return new Participant(
      updatedParticipant.id,
      updatedParticipant.nick,
      updatedParticipant.email,
      updatedParticipant.giftsList,
      groupObject
    );
  }
}
