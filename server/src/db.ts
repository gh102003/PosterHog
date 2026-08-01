import { PrismaClient } from "../prisma/generated/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: "postgresql://postgres:password@localhost:5432/postgres"
});

export const prisma = new PrismaClient({ adapter });