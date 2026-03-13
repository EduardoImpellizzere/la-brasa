import sql from "@/lib/db";

export async function POST(request, context) {
  const { id } = await context.params;
  const { nombre, rol, tipoTransporte, lugaresDisponibles } =
    await request.json();
  const tipo_transporte = tipoTransporte ?? null;
  const lugares_disponibles = lugaresDisponibles ?? null;

  try {
    const [transporte] = await sql`
    INSERT INTO transporte (asado_id, nombre, rol, tipo_transporte, lugares_disponibles)
    VALUES (${id}, ${nombre}, ${rol}, ${tipo_transporte}, ${lugares_disponibles})
    RETURNING *
    `;
    return Response.json(transporte, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(_, context) {
  const { id } = await context.params;

  try {
    const transportes =
      await sql`SELECT * FROM transporte WHERE asado_id = ${id}`;

    return Response.json(transportes, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
