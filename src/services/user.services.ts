import { prisma } from "../prismaClient";

export const getById = async (id: number) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id } });

  return user;
};
