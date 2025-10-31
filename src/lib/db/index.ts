import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle as neondatabase } from "drizzle-orm/neon-http";

config();

export const getDb = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  if (process.env.NODE_ENV === "production") {
    const sql = neon(process.env.DATABASE_URL);
    return neondatabase(sql);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  return drizzle(pool);
};
