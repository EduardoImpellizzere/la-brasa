import sql from "@/lib/db";

export async function POST(request, context) {
  const { id } = await context.params;
  const { quien, descripcion, monto } = await request.json();

  try {
    const [gasto] = await sql`
      INSERT INTO gastos (asado_id, quien, descripcion, monto)
      VALUES (${id}, ${quien}, ${descripcion}, ${monto})
      RETURNING *
    `;
    return Response.json(gasto, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(_, context) {
  const { id } = await context.params;

  try {
    const expenses = await sql`SELECT * FROM gastos WHERE asado_id = ${id}`;
    const [{ count }] =
      await sql`SELECT COUNT(*) FROM participantes WHERE asado_id = ${id}`;

    const totalCost = expenses.reduce((total, e) => total + Number(e.monto), 0);
    const sharePerPerson = count > 0 ? totalCost / Number(count) : 0;

    return Response.json(
      { expenses, summary: { totalCost, sharePerPerson } },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
