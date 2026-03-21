// prisma.config.ts
import { config } from "dotenv";
import { defineConfig } from "@prisma/config";

// Force dotenv to look at your specific Next.js env file
config({ path: ".env.local" });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
