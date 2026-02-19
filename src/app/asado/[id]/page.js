import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/api/asados/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!data || data.error) {
    notFound();
  }

  return (
    <ul>
      <li>{data.nombre}</li>
      <li>{data.fecha}</li>
      <li>{data.hora}</li>
      <li>{data.lugar}</li>
      <li>{data.estado}</li>
      {data.participantes.map((person) => (
        <li key={person}>{person}</li>
      ))}
    </ul>
  );
}
