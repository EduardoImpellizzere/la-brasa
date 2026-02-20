import Link from "next/link";
import GastosForm from "./GastosForm";

export default async function Page({ params }) {
  const { id } = await params;

  const [responseGastos, responseAsado] = await Promise.all([
    fetch(`http://localhost:3000/api/asados/${id}/gastos`),
    fetch(`http://localhost:3000/api/asados/${id}`),
  ]);

  const gastos = await responseGastos.json();
  const asado = await responseAsado.json();

  if (asado.error) {
    notFound();
  }

  return (
    <div>
      <p>Ingresar gastos:</p>
      <GastosForm id={id} participantes={asado.participantes} />

      {gastos.expenses.map((gasto) => (
        <ul key={gasto.id}>
          <li>{gasto.quien}</li>
          <li>{gasto.descripcion}</li>
          <li>{gasto.monto}</li>
        </ul>
      ))}

      <div>
        <p>Total: {gastos.summary.totalCost}</p>
        <p>Reparto por igual: {gastos.summary.sharePerPerson}</p>
      </div>

      <Link href={`/asado/${id}`}>Volver</Link>
    </div>
  );
}
