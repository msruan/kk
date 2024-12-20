import { PrismaClient } from "@prisma/client";

import { Group } from "../../domain/entities/group";
import {
  GroupCreateParams,
  GroupEditParams,
  IGroupRepository,
} from "../../domain/repositories/group.repository";

export class PrismaGroupRepository implements IGroupRepository {
  private prisma: PrismaClient = new PrismaClient();

  async create({
    name,
    description,
    celebrationDate,
    celebrationLocal,
  }: GroupCreateParams): Promise<Group> {
    const group = await this.prisma.group.create({
      data: {
        name,
        description,
        celebrationDate,
        celebrationLocal,
        drawStatus: "pending",
      },
    });

    return new Group(
      group.id,
      group.name,
      group.description,
      group.celebrationLocal,
      group.celebrationDate
    );
  }

  //@throws PrismaClientKnownRequestError
  async updateById(id: number, payload: GroupEditParams): Promise<Group> {
    const updatedGroup = await this.prisma.group.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });

    return new Group(
      updatedGroup.id,
      updatedGroup.name,
      updatedGroup.description,
      updatedGroup.celebrationLocal,
      updatedGroup.celebrationDate
    );
  }

  async findById(id: number): Promise<Group> {
    const group = await this.prisma.group.findUniqueOrThrow({
      where: { id },
    });
    return new Group(
      group.id,
      group.name,
      group.description,
      group.celebrationLocal,
      group.celebrationDate
    );
  }
}
