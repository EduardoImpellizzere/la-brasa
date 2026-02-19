import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DB_PATH = join(process.cwd(), "data", "asados.json");

function readFile() {
  return JSON.parse(readFileSync(DB_PATH, "utf-8"));
}

function searchById(id, file) {
  return file.find((item) => item.id === id);
}

export async function GET(_, context) {
  const { id } = await context.params;

  try {
    const parsedDB = readFile();
    const item = searchById(id, parsedDB);
    if (item != null) {
      return Response.json(item, { status: 200 });
    } else {
      return Response.json({ error: "Asado no encontrado" }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
