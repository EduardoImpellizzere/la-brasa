import { ESTADOS_ASADO } from "@/lib/opciones";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/api/asados/${id}`, {
    method: "GET",
  });

  const data = await response.json();

  if (!data || data.error) {
    notFound();
  }

  return (
    <>
      <ul>
        <li>Nombre: {data.nombre}</li>
        <li>Fecha: {data.fecha}</li>
        <li>Hora: {data.hora}</li>
        <li>Lugar: {data.lugar}</li>
        <li>
          Estado: {ESTADOS_ASADO.find((e) => e.value === data.estado)?.label}
        </li>
        <p>Quienes van:</p>
        {data.participantes.map((person) => (
          <li key={person}>{person}</li>
        ))}
      </ul>
      <Link href={`/asado/${id}/items`}>Items</Link>
      <Link href={`/asado/${id}/gastos`}>Gastos</Link>
      <Link href={`/asado/${id}/transporte`}>Transporte</Link>
    </>
  );
}
