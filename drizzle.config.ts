import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log(process.env.DATABASE_URL! + "cu");
export default defineConfig({
  out: "./drizzle",
  schema: "./src/persistence/drizzle/schemas",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
