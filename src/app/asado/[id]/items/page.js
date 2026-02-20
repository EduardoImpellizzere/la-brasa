import ItemForm from "./ItemForm";

export default async function Page({ params }) {
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/api/asados/${id}/items`, {
    method: "GET",
  });

  const data = await response.json();

  return (
    <div>
      <ItemForm id={id} />
      {data.map((item) => (
        <ul key={item.id}>
          <li>{item.nombre}</li>
          <li>{item.quien}</li>
          <li>{item.estado}</li>
        </ul>
      ))}
    </div>
  );
}
