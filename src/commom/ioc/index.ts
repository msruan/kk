import { container } from "tsyringe";
import { IGroupRepository } from "../../domain/repositories/group.repository";
import { ArrayGroupRepository } from "../../persistence/array/array.group.repository";

container.register<IGroupRepository>("IGroupRepository", ArrayGroupRepository);
