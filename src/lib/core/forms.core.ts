import {prisma} from "@/lib/prisma";

export const createForm = async (data: any) => {
  return prisma.form.create({ data });
};

export const updateUserRefreshToken = async (id: string, data: any) => {
  return prisma.form.update({
    where: { id },
    data: { ...data },
  });
};
