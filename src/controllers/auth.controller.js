import argon2 from "argon2";
import {prisma} from "../lib/prisma.js";

export const register = async (req, res, next) => {
  try {
    const { fullName, email, phone, password } = req.body;

    // Required field validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and password are required",
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check existing email
    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Hash password
    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    // Create user according to schema.prisma
    const user = await prisma.user.create({
      data: {
        fullName: fullName.trim(),
        email: normalizedEmail,
        phone: phone?.trim() || null,
        passwordHash,
        // role omitted: Prisma default is CUSTOMER
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};