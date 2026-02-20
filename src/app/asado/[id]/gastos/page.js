import GastosForm from "./GastosForm";

export default async function Page({ params }) {
  const { id } = await params;

  const response = await fetch(
    `http://localhost:3000/api/asados/${id}/gastos`,
    {
      method: "GET",
    },
  );

  const data = await response.json();

  return (
    <div>
      <GastosForm id={id} />
      {data.expenses.map((gasto) => (
        <ul key={gasto.id}>
          <li>{gasto.quien}</li>
          <li>{gasto.descripcion}</li>
          <li>{gasto.monto}</li>
        </ul>
      ))}
      <div>
        <div>Total: {data.summary.totalCost}</div>
        <div>Reparto por igual: {data.summary.sharePerPerson}</div>
      </div>
    </div>
  );
}
