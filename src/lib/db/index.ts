import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { neon } from "@neondatabase/serverless";
import { drizzle as neondatabase } from "drizzle-orm/neon-http";
import { schema } from "./schema";

export const getDb = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  if (process.env.NODE_ENV === "production") {
    const sql = neon(process.env.DATABASE_URL);
    return neondatabase(sql, { schema });
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  return drizzle(pool, { schema });
};
