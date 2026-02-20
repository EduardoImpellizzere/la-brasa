import { randomUUID } from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const DB_PATH_GASTOS = join(process.cwd(), "data", "gastos.json");
const DB_PATH_ASADOS = join(process.cwd(), "data", "asados.json");

function readFile(path) {
  return JSON.parse(readFileSync(path, "utf-8"));
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
  writeFileSync(DB_PATH_GASTOS, JSON.stringify(parsedDB, null, 2));
  return updatedItem;
}

function searchById(id, file) {
  return file.filter((gastos) => gastos.asadoId === id);
}

function totalCosts(id, file, gastos) {
  const asado = file.find((asado) => asado.id === id);
  const totalPersonas = asado.participantes.length;

  const totalCostos = gastos
    .map((gasto) => gasto.monto)
    .reduce((acumulador, valor) => acumulador + valor, 0);

  const cuotaIdeal = totalCostos / totalPersonas;

  return { totalCostos, cuotaIdeal };
}

export async function POST(request, context) {
  const body = await request.json();
  const { id } = await context.params;

  try {
    const parsedDB = readFile(DB_PATH_GASTOS);
    const updatedItem = addNewItemToFile(body, id, parsedDB);
    return Response.json(updatedItem, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(_, context) {
  const { id } = await context.params;

  try {
    const parsedDBGastos = readFile(DB_PATH_GASTOS);
    const parsedDBAsados = readFile(DB_PATH_ASADOS);

    const gastos = searchById(id, parsedDBGastos);
    const costos = totalCosts(id, parsedDBAsados, gastos);

    return Response.json({ gastos, costos }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
