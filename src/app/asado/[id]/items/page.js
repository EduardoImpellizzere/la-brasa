import { notFound } from "next/navigation";
import ItemForm from "./ItemForm";
import { ESTADOS_ITEM } from "@/lib/opciones";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Page({ params }) {
  const { id } = await params;

  const [responseItems, responseAsado] = await Promise.all([
    fetch(`http://localhost:3000/api/asados/${id}/items`),
    fetch(`http://localhost:3000/api/asados/${id}`),
  ]);

  const dataItems = await responseItems.json();
  const dataAsado = await responseAsado.json();

  if (dataAsado.error) {
    notFound();
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.eyebrow}>{dataAsado.nombre}</div>
        <h1 className={styles.title}>Quién lleva qué</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <ItemForm id={id} participantes={dataAsado.participantes} />
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Items cargados</span>
          </div>
          <ul className={styles.participantList}>
            {dataItems.map((item, index) => (
              <li key={index} className={styles.participantRow}>
                <div className={styles.itemInfo}>
                  <span className={styles.participantName}>{item.nombre}</span>
                  <span className={styles.sectionMeta}>{item.quien}</span>
                </div>

                <span
                  key={index}
                  className={`${styles.chip} ${
                    item.estado === "confirmado" || item.estado === "comprado"
                      ? styles.chipOk
                      : styles.chipPending
                  }`}
                >
                  {item.estado === "confirmado" || item.estado === "comprado"
                    ? "✓"
                    : "·"}{" "}
                  {ESTADOS_ITEM.find((e) => e.value === item.estado)?.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
