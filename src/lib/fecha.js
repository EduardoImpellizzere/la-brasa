export function formatearFecha(fecha) {
  const date = new Date(fecha + "T00:00:00");
  const resultado = date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return resultado
    .split(" ")
    .map((word) =>
      word === "de" ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}
