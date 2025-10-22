import { UserService } from "@/app/_libs/services/user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for sign-in
const SignInSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validate input
    const validationResult = SignInSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed" },
        { status: 400 },
      );
    }

    const { email, password } = validationResult.data;
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not set in environment variables");
    }

    // 2. Find the user
    // NOTE: You must update UserService.getUserByEmail to also select the 'hashedPassword'
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // 3. Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // 4. Create JWT
    const { hashedPassword: _, ...userWithoutPassword } = user; // Exclude hash from token/response
    
    const token = jwt.sign(
        { userId: user.id, email: user.email, name: user.name }, 
        secret, 
        { expiresIn: '1h' } // Token expires in 1 hour
    );

    // 5. Send response with token and user data
    return NextResponse.json({
      success: true,
      token,
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}