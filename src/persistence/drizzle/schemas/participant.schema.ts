import { AnyPgColumn, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { groupsTable } from "./group.schema";
import { timestamps } from "../columns.helpers";

export const participantsTable = pgTable("participants", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nick: varchar({ length: 50 }).notNull(),
  email: varchar({ length: 255 }),
  giftsList: varchar({ length: 500 }),
  groupId: integer()
    .notNull()
    .references(() => groupsTable.id),
  giftedId: integer().references((): AnyPgColumn => participantsTable.id),
  ...timestamps,
});
