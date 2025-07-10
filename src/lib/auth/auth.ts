import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";
import { getServerUser } from "./jwt";
import { cookies } from "next/headers";

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
    { id: user.id, email: user.email, name: user.name },
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


export const logoutUser = async () => {
  const user = await getServerUser();
  if (!user) {
    throw new Error("Not authenticated");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: null },
  });

  (await cookies()).set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
};
