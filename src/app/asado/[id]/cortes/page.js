"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { TIPOS_COCINA, GUIA } from "@/lib/guiaCortes";
import { Lightbulb } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function Page(params) {
  const [tipoCocina, setTipoCocina] = useState(TIPOS_COCINA[0].value);

  return (
    <>
      <PageHeader
        title="Guía de cortes"
        subtitle="Si no tenes en claro que usar, desde LaBrasa te damos una mano"
      />

      <div className={styles.pills}>
        {TIPOS_COCINA.map((tipo) => (
          <button
            key={tipo.value}
            className={`${styles.pill} ${tipoCocina === tipo.value ? styles.pillActive : ""}`}
            onClick={() => setTipoCocina(tipo.value)}
          >
            {tipo.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          {GUIA[tipoCocina].map((corte, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardImage}>imagen próximamente</div>
              <div className={styles.cardBody}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>{corte.nombre}</span>
                  <span
                    className={`${styles.tag} ${corte.tag === "esencial" ? styles.tagEsencial : styles.tagOpcional}`}
                  >
                    {corte.tag}
                  </span>
                </div>
                <div className={styles.cardDesc}>{corte.desc}</div>
                <div className={styles.cardTip}>
                  <Lightbulb /> {corte.tip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
