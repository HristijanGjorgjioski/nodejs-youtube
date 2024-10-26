import { prisma } from "../prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface LoginRegisterDtos {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: { id: number; email: string };
}

export const register = async ({ email, password }: LoginRegisterDtos) => {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser !== null) {
    throw new Error("User already exist!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return {
    id: newUser.id,
    email: newUser.email,
  };
};

export const login = async ({
  email,
  password,
}: LoginRegisterDtos): Promise<AuthResponse> => {
  const existingUser = await prisma.user.findFirstOrThrow({ where: { email } });

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials!");
  }

  const token = jwt.sign(
    { id: existingUser.id },
    process.env.JWT_SECRET ?? "",
    { expiresIn: "1h" }
  );

  return { token, user: { id: existingUser.id, email: existingUser.email } };
};
