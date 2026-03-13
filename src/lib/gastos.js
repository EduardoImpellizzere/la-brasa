export function calcularDeudas(expenses, participantes) {
  // Gasto total dividido entre todos los participantes
  const cuota = Number(
    (
      expenses.reduce((total, e) => total + Number(e.monto), 0) /
      participantes.length
    ).toFixed(2),
  );

  // Cuánto gastó cada uno
  const gastadoPor = {};
  participantes.forEach((p) => (gastadoPor[p] = 0));
  expenses.forEach((e) => (gastadoPor[e.quien] += Number(e.monto)));

  // Determinar el balance de cada uno | positivo = crédito, negativo = deuda
  const balances = participantes.map((p) => ({
    nombre: p,
    balance: Number((gastadoPor[p] - cuota).toFixed(2)),
  }));

  // Separar deudores y acreedores
  const deudores = balances
    .filter((b) => b.balance < 0)
    .sort((a, b) => a.balance - b.balance);
  const acreedores = balances
    .filter((b) => b.balance > 0)
    .sort((a, b) => b.balance - a.balance);

  const transacciones = [];

  while (deudores.length > 0 && acreedores.length > 0) {
    const deudor = deudores[0];
    const acreedor = acreedores[0];

    const monto = Number(
      Math.min(Math.abs(deudor.balance), acreedor.balance).toFixed(2),
    );

    transacciones.push({
      de: deudor.nombre,
      para: acreedor.nombre,
      monto: monto,
    });

    deudor.balance = Number((deudor.balance + monto).toFixed(2));
    acreedor.balance = Number((acreedor.balance - monto).toFixed(2));

    if (Math.abs(deudor.balance) < 0.01) deudores.shift();
    if (acreedor.balance < 0.01) acreedores.shift();
  }

  return { transacciones };
}
