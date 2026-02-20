import TransporteForm from "./TransporteForm";

export default async function Page({ params }) {
  const { id } = await params;

  const response = await fetch(
    `http://localhost:3000/api/asados/${id}/transporte`,
    {
      method: "GET",
    },
  );

  const data = await response.json();

  return (
    <div>
      <TransporteForm id={id} />
      {data.map((item) => (
        <ul key={item.id}>
          <li>{item.nombre}</li>
          <li>{item.rol}</li>
          {item.rol === "conductor" && (
            <>
              <li>{item.tipoTransporte}</li>
              <li>{item.lugaresDisponibles}</li>
            </>
          )}
        </ul>
      ))}
    </div>
  );
}
