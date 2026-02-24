import { notFound } from "next/navigation";
import TransporteForm from "./TransporteForm";
import { ROLES_TRANSPORTE, TIPOS_TRANSPORTE } from "@/lib/opciones";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Page({ params }) {
  const { id } = await params;

  const [responseTransporte, responseAsado] = await Promise.all([
    fetch(`http://localhost:3000/api/asados/${id}/transporte`),
    fetch(`http://localhost:3000/api/asados/${id}`),
  ]);

  const dataTransportes = await responseTransporte.json();
  const dataAsado = await responseAsado.json();

  const ROLE_STYLES = {
    conductor: styles.chipOk,
    pasajero_necesita: styles.chipWarn,
    pasajero_flexible: styles.chipPending,
    independiente: styles.chipPending,
  };

  if (dataAsado.error) {
    notFound();
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.eyebrow}>{dataAsado.nombre}</div>
        <h1 className={styles.title}>Como va cada uno?</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <TransporteForm id={id} participantes={dataAsado.participantes} />
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Datos cargados</span>
          </div>

          {dataTransportes.map((item, index) => (
            <div key={index} className={styles.participantRow}>
              <div className={styles.avatar}>
                {item.nombre.charAt(0).toUpperCase()}
              </div>

              <div className={styles.itemInfo}>
                <span className={styles.participantName}>{item.nombre}</span>
                <span className={styles.sectionMeta}>
                  {item.rol === "conductor" &&
                    `${TIPOS_TRANSPORTE.find((t) => t.value === item.tipoTransporte)?.label} · ${item.lugaresDisponibles} lugares libres`}
                </span>
              </div>

              <span className={`${styles.chip} ${ROLE_STYLES[item.rol]}`}>
                {ROLES_TRANSPORTE.find((r) => r.value === item.rol)?.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
