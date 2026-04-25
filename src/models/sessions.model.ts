import { mysqlTable, varchar,  timestamp} from "drizzle-orm/mysql-core";
import { users } from "../models/user.models.ts";

export const sessions = mysqlTable("sessions", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  userId: varchar("userId", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  refreshToken: varchar("refreshToken", { length: 512 }).notNull().unique(),

  expiresAt: timestamp("expiresAt").notNull(),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
});