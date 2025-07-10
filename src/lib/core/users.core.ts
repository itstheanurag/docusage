// lib/db.ts or wherever your helpers live
import  prisma  from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: {
  name: string;
  email: string;
  password?: string;
  link: string;
}) => {
  return prisma.user.create({ data });
};

export const updateUserRefreshToken = async (
  id: string,
  refreshToken: string
) => {
  return prisma.user.update({
    where: { id },
    data: { refreshToken },
  });
};
