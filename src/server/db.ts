import { PrismaClient } from "@prisma/client";
import { env } from "~/env";

// Import Neon serverless driver dependencies when needed
let PrismaNeon: any;
let neonConfig: any;

// Dynamically import Neon dependencies only when DATABASE_PROVIDER is postgresql
if (process.env.DATABASE_PROVIDER === "postgresql" && process.env.DATABASE_URL?.includes("neon.tech")) {
  // Import only on the server side to avoid issues with edge runtime
  if (typeof window === "undefined") {
    // These imports are dynamically loaded only when using Neon
    ({ PrismaNeon } = require("@prisma/adapter-neon"));
    ({ neonConfig } = require("@neondatabase/serverless"));
    
    // Configure WebSocket for Node.js environments
    const ws = require("ws");
    neonConfig.webSocketConstructor = ws;
    
    // Uncomment the line below for edge environments like Vercel Edge Functions
    // neonConfig.poolQueryViaFetch = true;
  }
}

const createPrismaClient = () => {
  // Check if we should use the Neon adapter
  if (
    process.env.DATABASE_PROVIDER === "postgresql" && 
    process.env.DATABASE_URL?.includes("neon.tech") && 
    PrismaNeon
  ) {
    // Set up Neon adapter with the connection string
    const connectionString = process.env.DATABASE_URL;
    const adapter = new PrismaNeon({ connectionString });
    
    // Create Prisma client with Neon adapter
    return new PrismaClient({
      adapter,
      log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  }
  
  // Default Prisma client setup
  return new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

// Type for global Prisma instance
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

// Create or reuse Prisma client to prevent multiple instances during development
export const db = globalForPrisma.prisma ?? createPrismaClient();

// Store Prisma client in global scope for development to avoid hot-reload connection issues
if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
