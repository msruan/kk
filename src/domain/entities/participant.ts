import { Group } from "./group";

export class Participant {
  id: number;
  nick: string;
  email: string | null;
  giftsList: string | null;
  group: Group;
  giftedId: number | null;

  constructor(
    id: number,
    nick: string,
    email: string | null,
    giftsList: string | null,
    group: Group
  ) {
    this.id = id;
    this.nick = nick;
    this.email = email;
    this.giftsList = giftsList;
    this.group = group;
    this.giftedId = null;
  }
}
