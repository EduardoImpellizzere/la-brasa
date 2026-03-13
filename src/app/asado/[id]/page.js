import { ESTADOS_ASADO, ESTADOS_ITEM } from "@/lib/opciones";
import { formatearFecha } from "@/lib/fecha";
import { calcularCarne } from "@/lib/calculadora";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { Calendar, MapPin, Clock, House, KeyRound } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ChipByState from "@/components/ChipByState";

export default async function Page({ params }) {
  const { id } = await params;

  const [responseAsado, responseGastos, responseItems] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/asados/${id}`),
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/asados/${id}/gastos`),
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/asados/${id}/items`),
  ]);

  const dataAsado = await responseAsado.json();
  const dataGastos = await responseGastos.json();
  const dataItems = await responseItems.json();

  if (!dataAsado || dataAsado.error) {
    notFound();
  }

  const totalPersonas = dataAsado.participantes.length;
  const totalGastosCargados = dataGastos.expenses.length;
  const { totalKg } = calcularCarne(totalPersonas, "normal");
  const totalItems = dataItems.length;
  const itemsConfirmados = dataItems.filter(
    (item) => item.estado === "confirmado" || item.estado === "comprado",
  ).length;
  const progreso =
    totalItems > 0 ? Math.round((itemsConfirmados / totalItems) * 100) : 0;

  return (
    <>
      <PageHeader
        eyebrow="Próximo asado"
        title={dataAsado.nombre}
        subtitle={
          <>
            {" "}
            <Calendar size={14} /> {formatearFecha(dataAsado.fecha)} ·{" "}
            <Clock size={14} /> {dataAsado.hora}
            {"hs"} · <MapPin size={14} /> {dataAsado.lugar}
          </>
        }
      />

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardValue}>{totalPersonas}</div>
          <div className={styles.cardLabel}>Personas confirmadas</div>
          <ChipByState state="confirmado" label="Todos confirmados" />
        </div>

        <div className={styles.card}>
          <div className={styles.cardValue}>
            € {dataGastos.summary.totalCost}
          </div>
          <div className={styles.cardLabel}>Gastado hasta ahora</div>
          <ChipByState
            state="warning"
            label={`${totalGastosCargados} gastos cargados`}
          />
        </div>

        <div className={styles.card}>
          <div className={styles.cardValue}>{totalKg} kg</div>
          <div className={styles.cardLabel}>de carne calculados</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>Progreso general</span>
              <span className={styles.sectionMeta}>
                {itemsConfirmados} de {totalItems} items listos
              </span>
            </div>
            <div className={styles.progressRow}>
              <span className={styles.sectionMeta}>Items confirmados</span>
              <span className={styles.sectionMeta}>{progreso}%</span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progreso}%` }}
              />
            </div>
            <div className={styles.chips}>
              {dataItems.map((item, index) => (
                <ChipByState
                  key={index}
                  state={item.estado}
                  label={item.nombre}
                />
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Asignaciones</div>
              <div className={styles.sectionMeta}>Ver todo</div>
            </div>
            <ul className={styles.participantList}>
              {dataItems.map((item, index) => (
                <li key={index} className={styles.participantRow}>
                  <div className={styles.itemInfo}>
                    <span className={styles.participantName}>
                      {item.nombre}
                    </span>
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

        <div className={styles.contentRight}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Ubicacion</div>
              <div className={styles.sectionMeta}>Abrir en Maps</div>
            </div>
            <div className={styles.locationRow}>
              <div className={styles.sectionMeta}>
                <House size={10} /> {dataAsado.lugar}
              </div>
              <div className={styles.sectionMeta}>
                <KeyRound size={10} /> Portero 7B
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Participantes</div>
              <div className={styles.sectionMeta}>Invitar</div>
            </div>

            <ul className={styles.participantList}>
              {dataAsado.participantes.map((person, index) => (
                <li key={index} className={styles.participantRow}>
                  <div className={styles.avatar}>
                    {person.charAt(0).toUpperCase()}
                  </div>
                  <span className={styles.participantName}>{person}</span>
                  <ChipByState
                    key={index}
                    state="confirmado"
                    label="Confirmado"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
