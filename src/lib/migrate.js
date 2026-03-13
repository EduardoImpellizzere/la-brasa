import sql from "./db.js";
import { readFileSync } from "fs";

const schema = readFileSync("src/lib/schema.sql", "utf8");

await sql.unsafe(schema);
console.log("Tablas creadas");

await sql.end();
