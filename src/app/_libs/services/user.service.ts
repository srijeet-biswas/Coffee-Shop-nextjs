import { db } from "@/src/db/client"; // Import your Drizzle client
import { usersTable } from "@/src/db/schema/postgres"; // Import your real schema
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { z } from "zod";

// Infer the 'insert' and 'select' types FROM THE SCHEMA
export type NewUser = typeof usersTable.$inferInsert;
export type User = typeof usersTable.$inferSelect;

// Validation schema from your original signin route
const SignInSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export class UserService {
  // =================================================================
  // == YOUR EXISTING METHODS (for sign-up, profile, etc.)
  // =================================================================

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

  // =================================================================
  // == NEW METHODS FOR NEXT-AUTH
  // =================================================================

  /**
   * Validates a user's email and password for the CredentialsProvider.
   * @returns The user object without the password, or null if invalid.
   */
  static async validatePassword(
    email?: string,
    password?: string,
  ): Promise<Omit<User, "hashedPassword"> | null> {
    // 1. Validate input
    const validationResult = SignInSchema.safeParse({ email, password });
    if (!validationResult.success) {
      return null;
    }
    const { email: validEmail, password: validPassword } = validationResult.data;

    try {
      // 2. Find user
      const user = await this.getUserByEmail(validEmail);
      if (!user || !user.hashedPassword) {
        // User not found or they have no password (e.g., Google user)
        return null;
      }

      // 3. Compare password
      const isPasswordValid = await bcrypt.compare(
        validPassword,
        user.hashedPassword,
      );
      if (!isPasswordValid) {
        return null;
      }

      // 4. Return user without password
      const { hashedPassword: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error("Error in validatePassword:", error);
      return null;
    }
  }

  /**
   * Finds an existing user or creates a new one for provider sign-in (e.g., Google).
   * @returns The user object.
   */
  static async findOrCreateProviderUser(data: {
    email: string;
    name: string;
    // image?: string | null; // You can add this if you add an 'image' column to your schema
  }): Promise<User | null> {
    try {
      // 1. Check if user already exists
      const existingUser = await this.getUserByEmail(data.email);
      if (existingUser) {
        return existingUser;
      }

      // 2. Create new user if they don't exist
      // This works because your 'hashedPassword' is nullable
      const newUser = {
        email: data.email,
        name: data.name,
      };

      const result = await db.insert(usersTable).values(newUser).returning();
      return result[0];
    } catch (error) {
      console.error("Error in findOrCreateProviderUser:", error);
      return null;
    }
  }
}