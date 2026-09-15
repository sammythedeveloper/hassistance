// prisma.config.ts
import path from "node:path";
import { config } from "dotenv";
import { defineConfig } from "@prisma/config";

// Load both; .env.local wins for local Next.js
config({ path: path.resolve(process.cwd(), ".env") });
config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
