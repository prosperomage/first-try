import { mysqlTable, varchar, text, timestamp, int, mysqlEnum } from "drizzle-orm/mysql-core";


export const internships = mysqlTable("internships", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description").notNull(),

  companyName: varchar("companyName", { length: 255 }).notNull(),

  location: varchar("location", { length: 255 }).notNull(),

  type: mysqlEnum("type", ["REMOTE", "HYBRID", "ON-SITE"])
    .default("REMOTE")
    .notNull(),

  duration: varchar("duration", { length: 100 }),

  stipend: int("stipend").default(0),

  createdAt: timestamp("createdAt").defaultNow().notNull(),

  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .onUpdateNow()
    .notNull(),
});