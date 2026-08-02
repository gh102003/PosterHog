import { PrismaClient } from "../prisma/generated/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: "postgresql://postgres:password@localhost:5432/postgres"
});

export const prisma = new PrismaClient({ adapter })
  .$extends({
    result: {
      // Send posters.location_photo as a base64 string
      posters: {
        location_photo: {
          needs: { location_photo: true },
          compute(posters) {
            if (!posters.location_photo) return null;
            return Buffer.from(posters.location_photo).toString("base64");
          },
        },
      },
    },
  });