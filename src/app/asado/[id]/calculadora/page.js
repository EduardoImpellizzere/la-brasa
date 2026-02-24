"use client";

import { calcularCarne, TIPOS_ASADO } from "@/lib/calculadora";
import { useState } from "react";
import styles from "./page.module.css";

export default function Page(params) {
  const [form, setForm] = useState({
    tipo: TIPOS_ASADO[0].value,
    totalPersonas: 0,
  });

  const resultado = calcularCarne(form.totalPersonas, form.tipo);

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Calculadora</h1>
        <div className={styles.subtitle}>
          Por si necesitas ayuda para calcular cuanto necesitas comprar
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <form className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Tipo de asado:</label>
              <select
                className={styles.select}
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              >
                {TIPOS_ASADO.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Cantidad de personas:</label>
              <input
                className={styles.input}
                type="number"
                value={form.totalPersonas}
                onChange={(e) =>
                  setForm({ ...form, totalPersonas: Number(e.target.value) })
                }
              />
            </div>
          </form>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>
              Total de {resultado.totalKg} Kg
            </span>
          </div>
          <div className={styles.corteList}>
            {resultado.desglose.map((item) => (
              <div key={item.nombre} className={styles.corteRow}>
                <span className={styles.corteName}>{item.nombre}</span>
                <span className={styles.corteKg}>{item.kg} kg</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
