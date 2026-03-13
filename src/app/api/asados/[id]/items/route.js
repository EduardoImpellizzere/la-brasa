import sql from "@/lib/db";

export async function POST(request, context) {
  const { id } = await context.params;
  const { nombre, quien, estado } = await request.json();

  try {
    const [item] = await sql`
    INSERT INTO items (asado_id, nombre, quien, estado)
    VALUES (${id}, ${nombre}, ${quien}, ${estado})
    RETURNING *
    `;
    return Response.json(item, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(_, context) {
  const { id } = await context.params;

  try {
    const items = await sql`SELECT * FROM items WHERE asado_id = ${id}`;

    return Response.json(items, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
