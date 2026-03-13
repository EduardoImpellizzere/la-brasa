import { notFound } from "next/navigation";
import ItemForm from "./ItemForm";
import { ESTADOS_ITEM } from "@/lib/opciones";
import Link from "next/link";
import styles from "./page.module.css";
import PageHeader from "@/components/PageHeader";
import ChipByState from "@/components/ChipByState";

export default async function Page({ params }) {
  const { id } = await params;

  const [responseItems, responseAsado] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/asados/${id}/items`),
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/asados/${id}`),
  ]);

  const dataItems = await responseItems.json();
  const dataAsado = await responseAsado.json();

  if (dataAsado.error) {
    notFound();
  }

  return (
    <>
      <PageHeader eyebrow={dataAsado.nombre} title="Quién lleva qué" />

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

                <ChipByState
                  key={index}
                  state={item.estado}
                  label={
                    ESTADOS_ITEM.find((e) => e.value === item.estado)?.label
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
