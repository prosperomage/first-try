import { mysqlTable, varchar,  timestamp,  mysqlEnum } from "drizzle-orm/mysql-core";

// Users Table
export const users = mysqlTable("user", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

  password: varchar("password", { length: 255 }).notNull(),

  role: mysqlEnum("role", ["USER", "ADMIN"])
    .default("USER")
    .notNull(),

  createdAt: timestamp("createdAt").defaultNow().notNull(),

  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .onUpdateNow()
    .notNull(),
});







