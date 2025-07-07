import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";

const JWT_SECRET = process.env.JWT_SECRET || "";
export const registerUser = async ({
  name,
  email,
  password,
  link,
}: {
  name: string;
  email: string;
  password: string;
  link: string;
}) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      link,
    },
  });

  return user;
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const refreshToken = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { user, refreshToken };
};

export const logoutUser = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
};
