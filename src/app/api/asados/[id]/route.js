import sql from "@/lib/db";

export async function GET(_, context) {
  const { id } = await context.params;

  try {
    const [asado] = await sql`SELECT * FROM asados WHERE id = ${id}`;
    const participantes =
      await sql`SELECT nombre FROM participantes WHERE asado_id = ${id}`;

    return Response.json(
      { ...asado, participantes: participantes.map((p) => p.nombre) },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
