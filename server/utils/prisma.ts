import { PrismaClient } from "@prisma/client";
import { pagination } from "prisma-extension-pagination";

// Create a singleton instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient().$extends(
    pagination({
      pages: { limit: 20, includePageCount: true },
    }),
  );
};

// Make it available globally
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

/**
 * Prisma client instance.
 *
 * This should be used all over the app instead of re-creating new instances.
 */
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
