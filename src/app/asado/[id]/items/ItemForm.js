"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ESTADOS_ITEM } from "@/lib/opciones";
import styles from "./itemForm.module.css";

export default function ItemForm({ id, participantes = [] }) {
  const [form, setForm] = useState({
    nombre: "",
    quien: participantes[0] ?? "",
    estado: ESTADOS_ITEM[0].value,
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`http://localhost:3000/api/asados/${id}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.refresh();
    setForm({
      nombre: "",
      quien: participantes[0] ?? "",
      estado: ESTADOS_ITEM[0].value,
    });
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Cosa:</label>
          <input
            className={styles.input}
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Quien:</label>
          <select
            className={styles.select}
            value={form.quien}
            onChange={(e) => setForm({ ...form, quien: e.target.value })}
          >
            {participantes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Estado:</label>
          <select
            className={styles.select}
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value })}
          >
            {ESTADOS_ITEM.map((estadoItem) => (
              <option key={estadoItem.value} value={estadoItem.value}>
                {estadoItem.label}
              </option>
            ))}
          </select>
        </div>

        <button className={styles.btnPrimary} type="submit">
          Enviar
        </button>
      </form>
    </>
  );
}
