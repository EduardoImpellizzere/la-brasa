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
      {data.gastos.map((gasto) => (
        <ul key={gasto.id}>
          <li>{gasto.quien}</li>
          <li>{gasto.descripcion}</li>
          <li>{gasto.monto}</li>
        </ul>
      ))}
      <div>
        <div>Total: {data.costos.totalCostos}</div>
        <div>Reparto por igual: {data.costos.cuotaIdeal}</div>
      </div>
    </div>
  );
}
