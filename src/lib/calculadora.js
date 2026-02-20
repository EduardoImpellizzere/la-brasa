export const FACTORES = {
  tranquilo: 0.28,
  normal: 0.35,
  carnivoros: 0.5,
};

export const CORTES = [
  { nombre: "Vacío", porcentaje: 0.35 },
  { nombre: "Costillas", porcentaje: 0.25 },
  { nombre: "Chorizo / Morcilla", porcentaje: 0.2 },
  { nombre: "Achuras", porcentaje: 0.1 },
  { nombre: "Pollo (opcional)", porcentaje: 0.1 },
];

export function calcularCarne(personas, tipo) {
  const totalKg = Number((personas * FACTORES[tipo]).toFixed(2));
  return {
    totalKg,
    desglose: CORTES.map((corte) => ({
      nombre: corte.nombre,
      kg: Number((totalKg * corte.porcentaje).toFixed(2)),
    })),
  };
}
