import { db } from "@/src/db/client"; // Import your Drizzle client
import { usersTable } from "@/src/db/schema/postgres"; // Import your real schema
import { eq } from "drizzle-orm";

// Infer the 'insert' and 'select' types FROM THE SCHEMA
// This is the key fix
export type NewUser = typeof usersTable.$inferInsert;
export type User = typeof usersTable.$inferSelect;

export class UserService {
  static async createUser(userData: NewUser): Promise<User> {
    // This now uses Drizzle to insert into your real database
    const result = await db.insert(usersTable).values(userData).returning();
    return result[0];
  }

  static async getUserById(id: number): Promise<User | null> {
    // Select from the database
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    return result[0] || null;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    // Select from the database, including the hashedPassword
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    return result[0] || null;
  }

  static async getAllUsers(): Promise<User[]> {
    return await db.select().from(usersTable);
  }

  static async updateUser(
    id: number,
    updates: Partial<Omit<User, "id">>,
  ): Promise<User | null> {
    const result = await db
      .update(usersTable)
      .set(updates)
      .where(eq(usersTable.id, id))
      .returning();

    return result[0] || null;
  }

  static async deleteUser(id: number): Promise<boolean> {
    const result = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();

    return result.length > 0;
  }
}