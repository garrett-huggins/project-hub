import { PrismaClient } from "@prisma/client";

const createPrismaClient = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

const globalForPrisma = global as {
  prismaGlobal: ReturnType<typeof createPrismaClient>;
} & typeof global;

export const db = globalForPrisma.prismaGlobal || createPrismaClient();
