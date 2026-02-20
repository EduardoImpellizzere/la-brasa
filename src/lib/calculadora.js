export const TIPOS_ASADO = [
  { value: "tranquilo", label: "Tranquilo", factor: 0.28 },
  { value: "normal", label: "Normal", factor: 0.35 },
  { value: "carnivoros", label: "Carnívoros", factor: 0.5 },
];

export const CORTES = [
  { nombre: "Vacío", porcentaje: 0.35 },
  { nombre: "Costillas", porcentaje: 0.25 },
  { nombre: "Chorizo / Morcilla", porcentaje: 0.2 },
  { nombre: "Achuras", porcentaje: 0.1 },
  { nombre: "Pollo (opcional)", porcentaje: 0.1 },
];

export function calcularCarne(personas, tipo) {
  const tipoAsado = TIPOS_ASADO.find((t) => t.value === tipo);
  const totalKg = Number((personas * tipoAsado.factor).toFixed(2));
  return {
    totalKg,
    desglose: CORTES.map((corte) => ({
      nombre: corte.nombre,
      kg: Number((totalKg * corte.porcentaje).toFixed(2)),
    })),
  };
}
