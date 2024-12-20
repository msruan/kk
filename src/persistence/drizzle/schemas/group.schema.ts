import {
  integer,
  pgTable,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { timestamps } from "../columns.helpers";

export const drawStatus = pgEnum("draw_status", ["pending", "done"]);

export const groupsTable = pgTable("groups", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  celebrationLocal: varchar({ length: 255 }),
  celebrationDate: timestamp(),
  drawStatus: drawStatus().notNull().default("pending"),
  ...timestamps,
});
