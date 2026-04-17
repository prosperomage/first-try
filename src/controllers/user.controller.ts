import bcrypt from "bcrypt";
import { db } from "../../index.ts"; // Your drizzle db instance
import { users } from "../config/schema.js"; // Your drizzle schema
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid"; // Use 'npm install uuid' for IDs
import type { Request, Response } from "express";

const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "all fields should be filled" });
    }

    const lowerEmail = email.toLowerCase();

    // 1. Check if user exists
    // In Drizzle, we select the table and use .where()
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, lowerEmail))
      .limit(1);

    if (existingUser) {
      return res.status(400).json({ message: "user is already registered" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save to MySQL
    const userId = uuidv4();
    await db.insert(users).values({
      id: userId,
      firstName,
      lastName,
      email: lowerEmail,
      password: hashedPassword,
    });

    console.log("user has been registered");
    res.status(201).json({
      message: "User created successfully, we lit!!",
      user: { id: userId, firstName, lastName },
    });
  } catch (error) {
    res.status(500).json({ message: "user cant be registered", error });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
    console.log("user has been logged in");
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "logged out successfully",
      user: { email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

export { RegisterUser, loginUser, logoutUser };
