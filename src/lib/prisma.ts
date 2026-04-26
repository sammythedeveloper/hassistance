// src/lib/prisma.ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

function sanitizeConnectionStringForExplicitSsl(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl);
    // pg gives precedence to SSL params embedded in connectionString.
    // Remove them so our explicit ssl object (with CA) is actually used.
    [
      "sslmode",
      "sslcert",
      "sslkey",
      "sslrootcert",
      "sslca",
      "ssl",
    ].forEach((param) => parsed.searchParams.delete(param));
    return parsed.toString();
  } catch {
    return rawUrl;
  }
}

function loadDatabaseCaCertificate(): string | undefined {
  const inline = process.env.DATABASE_CA_CERT?.trim();
  if (inline) {
    // Supports multiline certs provided as escaped newlines in env vars.
    return inline.replace(/\\n/g, "\n");
  }

  const certPath = process.env.DATABASE_CA_CERT_PATH?.trim();
  if (!certPath) return undefined;

  try {
    return readFileSync(resolve(certPath), "utf8");
  } catch {
    throw new Error(
      `Failed to read DATABASE_CA_CERT_PATH at "${certPath}". Check file path and permissions.`
    );
  }
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set.");
  }

  const ca = loadDatabaseCaCertificate();
  const ssl = ca
    ? {
        rejectUnauthorized: true,
        ca,
        minVersion: "TLSv1.2" as const,
      }
    : undefined;

  const effectiveConnectionString = ca
    ? sanitizeConnectionStringForExplicitSsl(connectionString)
    : connectionString;

  const pool = new Pool({
    connectionString: effectiveConnectionString,
    ssl,
  });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: ["query"],
  });
}

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

// Lazy proxy avoids DATABASE_URL checks during module import (important for CI build).
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client as object, prop, receiver);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});
