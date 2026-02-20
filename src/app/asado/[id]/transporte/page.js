import { notFound } from "next/navigation";
import TransporteForm from "./TransporteForm";
import { ROLES_TRANSPORTE, TIPOS_TRANSPORTE } from "@/lib/opciones";
import Link from "next/link";

export default async function Page({ params }) {
  const { id } = await params;

  const [responseTransporte, responseAsado] = await Promise.all([
    fetch(`http://localhost:3000/api/asados/${id}/transporte`),
    fetch(`http://localhost:3000/api/asados/${id}`),
  ]);

  const transportes = await responseTransporte.json();
  const asado = await responseAsado.json();

  if (asado.error) {
    notFound();
  }

  return (
    <div>
      <p>Indicar como va cada uno:</p>
      <TransporteForm id={id} participantes={asado.participantes} />

      <p />
      {transportes.map((item) => (
        <ul key={item.id}>
          <li>{item.nombre}</li>
          <li>{ROLES_TRANSPORTE.find((r) => r.value === item.rol)?.label}</li>
          {item.rol === "conductor" && (
            <>
              <li>
                {
                  TIPOS_TRANSPORTE.find((t) => t.value === item.tipoTransporte)
                    ?.label
                }
              </li>
              <li>{item.lugaresDisponibles}</li>
            </>
          )}
        </ul>
      ))}

      <Link href={`/asado/${id}`}>Volver</Link>
    </div>
  );
}
