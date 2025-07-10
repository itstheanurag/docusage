// lib/db.ts or wherever your helpers live
import { prisma } from "@/lib/prisma";

interface UserCreateData {
  name: string;
  email: string;
  password?: string;
  link: string;
}

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: UserCreateData) => {
  return prisma.user.create({ data });
};

export const updateUserRefreshToken = async (
  id: string,
  refreshToken: string | null
) => {
  return prisma.user.update({
    where: { id },
    data: { refreshToken },
  });
};
