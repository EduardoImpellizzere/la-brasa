"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./GastosForm.module.css";

export default function GastosForm({ id, participantes = [] }) {
  const [form, setForm] = useState({
    quien: participantes[0] ?? "",
    descripcion: "",
    monto: 0,
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/asados/${id}/gastos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.refresh();

    setForm({
      quien: participantes[0] ?? "",
      descripcion: "",
      monto: 0,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
        <label className={styles.label}>Cuanto:</label>
        <input
          className={styles.input}
          type="number"
          value={form.monto}
          onChange={(e) => setForm({ ...form, monto: Number(e.target.value) })}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>En que?</label>
        <input
          className={styles.input}
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
      </div>

      <button className={styles.btnPrimary} type="submit">
        Enviar
      </button>
    </form>
  );
}
