import { NextRequest, NextResponse } from "next/server";
<<<<<<< HEAD
import { z } from "zod";
import bcrypt from "bcrypt";
=======

import { z } from "zod";

>>>>>>> 8cc1a459912cfc283428697dbc0db0e581ab54fa
import { UserService } from "@/app/_libs/services/user.service";

// Validation schemas
const CreateUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email format").max(255, "Email too long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// GET /api/users - Fetch all users
export async function GET() {
  try {
    const users = await UserService.getAllUsers();

    return NextResponse.json({
      success: true,
      users,
      total: users.length,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch users",
      },
      { status: 500 },
    );
  }
}

// DELETE /api/users - Reset all users (for testing)
export async function DELETE() {
  try {
    UserService.reset();

    return NextResponse.json({
      success: true,
      message: "All users deleted",
    });
  } catch (error) {
    console.error("Error deleting users:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete users",
      },
      { status: 500 },
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = CreateUserSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.format(),
        },
        { status: 400 },
      );
    }

    const { name, email, password } = validationResult.data;

    // Check if user with email already exists
    const existingUser = await UserService.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User with this email already exists",
        },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserService.createUser({ 
      name, 
      email, 
      hashedPassword 
    });

    const { hashedPassword: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        success: true,
        user: userWithoutPassword,
        message: "User created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create user",
      },
      { status: 500 },
    );
  }
}
