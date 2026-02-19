import { randomUUID } from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DB_PATH = join(process.cwd(), "data", "asados.json");

function readFile() {
  return JSON.parse(readFileSync(DB_PATH, "utf-8"));
}

function existById(id, file) {
  return file.some((item) => item.id === id);
}

function addNewItemToFile(newItem, parsedDB) {
  const randomID = randomUUID();

  if (!existById(randomID, parsedDB)) {
    const updatedItem = {
      id: randomID,
      creadoEn: new Date().toISOString(),
      ...newItem,
    };
    parsedDB.push(updatedItem);
    writeFileSync(DB_PATH, JSON.stringify(parsedDB, null, 2));
    return updatedItem;
  }
}

export async function POST(request) {
  const body = await request.json();

  try {
    const parsedDB = readFile();
    const updatedItem = addNewItemToFile(body, parsedDB);
    return Response.json(updatedItem, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const parsedDB = readFile();
    return Response.json(parsedDB, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
