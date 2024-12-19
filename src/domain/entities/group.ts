import { Participant } from "./participant";

export class Group {
  id: number;
  name: string;
  description: string | null;
  celebrationLocal: string | null;
  celebrationDate: Date | null;
  drawStatus: "pending" | "done";

  constructor(
    id: number,
    name: string,
    description: string | null,
    celebrationLocal: string | null,
    celebrationDate: Date | null
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.celebrationLocal = celebrationLocal;
    this.celebrationDate = celebrationDate;
    this.drawStatus = "pending";
  }
}
