import { Group } from "./group";

export class Participant {
  id: number;
  nick: string;
  email: string | null;
  password: string | null;
  giftsList: string | null;
  group: Group;
  gifted: Participant | null;

  constructor(
    id: number,
    nick: string,
    email: string | null,
    password: string | null,
    giftsList: string | null,
    group: Group
  ) {
    this.id = id;
    this.nick = nick;
    this.email = email;
    this.password = password;
    this.giftsList = giftsList;
    this.group = group;
    this.gifted = null;
  }
}
