import Link from "next/link";
import GastosForm from "./GastosForm";
import styles from "./page.module.css";

export default async function Page({ params }) {
  const { id } = await params;

  const [responseGastos, responseAsado] = await Promise.all([
    fetch(`http://localhost:3000/api/asados/${id}/gastos`),
    fetch(`http://localhost:3000/api/asados/${id}`),
  ]);

  const dataGastos = await responseGastos.json();
  const dataAsado = await responseAsado.json();

  if (dataAsado.error) {
    notFound();
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.eyebrow}>{dataAsado.nombre}</div>
        <h1 className={styles.title}>Ingreso de Gastos</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <GastosForm id={id} participantes={dataAsado.participantes} />
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Gastos cargados</span>
            <span className={styles.sectionMeta}>
              Total: €{dataGastos.summary.totalCost}
            </span>
          </div>
          {dataGastos.expenses.map((gasto, index) => (
            <div key={index} className={styles.participantRow}>
              <div className={styles.avatar}>
                {gasto.quien.charAt(0).toUpperCase()}
              </div>
              <div className={styles.itemInfo}>
                <span className={styles.participantName}>{gasto.quien}</span>
                <span className={styles.sectionMeta}>{gasto.descripcion}</span>
              </div>
              <span className={styles.amount}>€{gasto.monto}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
