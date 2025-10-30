import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

if (typeof window === "undefined") {
  config({ path: ".env" }); // or .env.local
}
export const getDb = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }
  return drizzle(process.env.DATABASE_URL);
};
