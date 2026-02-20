import { notFound } from "next/navigation";
import ItemForm from "./ItemForm";
import { ESTADOS_ITEM } from "@/lib/opciones";
import Link from "next/link";

export default async function Page({ params }) {
  const { id } = await params;

  const [responseItems, responseAsado] = await Promise.all([
    fetch(`http://localhost:3000/api/asados/${id}/items`),
    fetch(`http://localhost:3000/api/asados/${id}`),
  ]);

  const items = await responseItems.json();
  const asado = await responseAsado.json();

  if (asado.error) {
    notFound();
  }

  return (
    <div>
      <p>Quien lleva que cosa</p>
      <ItemForm id={id} participantes={asado.participantes} />
      {items.map((item) => (
        <ul key={item.id}>
          <li>{item.nombre}</li>
          <li>{item.quien}</li>
          <li>{ESTADOS_ITEM.find((e) => e.value === item.estado)?.label}</li>
        </ul>
      ))}

      <Link href={`/asado/${id}`}>Volver</Link>
    </div>
  );
}
