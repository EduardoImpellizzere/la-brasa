import sql from "@/lib/db";

export async function POST(request) {
  const body = await request.json();

  try {
    const { nombre, fecha, hora, lugar, estado, participantes } = body;

    const [asado] = await sql`
      INSERT INTO asados (nombre, fecha, hora, lugar, estado)
      VALUES (${nombre}, ${fecha}, ${hora}, ${lugar}, ${estado})
      RETURNING *
    `;

    if (participantes?.length > 0) {
      await sql`
        INSERT INTO participantes ${sql(
          participantes.map((nombre) => ({ asado_id: asado.id, nombre })),
        )}
      `;
    }

    return Response.json(asado, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const asados = await sql`SELECT * FROM asados ORDER BY creado_en DESC`;
    return Response.json(asados, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
