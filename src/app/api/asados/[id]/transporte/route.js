import { randomUUID } from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DB_PATH = join(process.cwd(), "data", "transporte.json");

function readFile() {
  return JSON.parse(readFileSync(DB_PATH, "utf-8"));
}

function addNewItemToFile(newItem, asadoId, parsedDB) {
  const randomID = randomUUID();

  const updatedItem = {
    id: randomID,
    asadoId: asadoId,
    ...newItem,
    creadoEn: new Date().toISOString(),
  };
  parsedDB.push(updatedItem);
  writeFileSync(DB_PATH, JSON.stringify(parsedDB, null, 2));
  return updatedItem;
}

function searchById(id, file) {
  return file.filter((item) => item.asadoId === id);
}

export async function POST(request, context) {
  const body = await request.json();
  const { id } = await context.params;

  try {
    const parsedDB = readFile();
    const updatedItem = addNewItemToFile(body, id, parsedDB);
    return Response.json(updatedItem, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(_, context) {
  const { id } = await context.params;

  try {
    const parsedDB = readFile();
    const item = searchById(id, parsedDB);

    return Response.json(item, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
