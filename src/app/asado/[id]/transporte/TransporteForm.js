"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROLES_TRANSPORTE, TIPOS_TRANSPORTE } from "@/lib/opciones";
import styles from "./TransporteForm.module.css";

export default function TransporteForm({ id, participantes = [] }) {
  const [form, setForm] = useState({
    nombre: participantes[0] ?? "",
    rol: ROLES_TRANSPORTE[0].value,
    tipoTransporte: TIPOS_TRANSPORTE[0].value,
    lugaresDisponibles: 0,
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`http://localhost:3000/api/asados/${id}/transporte`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.refresh();

    setForm({
      nombre: participantes[0] ?? "",
      rol: ROLES_TRANSPORTE[0].value,
      tipoTransporte: TIPOS_TRANSPORTE[0].value,
      lugaresDisponibles: 0,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <div className={styles.label}>Quien:</div>
        <select
          className={styles.select}
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        >
          {participantes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <div className={styles.label}>Rol:</div>
        <select
          className={styles.select}
          value={form.rol}
          onChange={(e) =>
            setForm({
              ...form,
              rol: e.target.value,
              tipoTransporte: TIPOS_TRANSPORTE[0].value,
              lugaresDisponibles: 0,
            })
          }
        >
          {ROLES_TRANSPORTE.map((rol) => (
            <option key={rol.value} value={rol.value}>
              {rol.label}
            </option>
          ))}
        </select>
      </div>

      {form.rol === "conductor" && (
        <>
          <div className={styles.field}>
            <div className={styles.label}>Tipo de transporte:</div>
            <select
              className={styles.select}
              value={form.tipoTransporte}
              onChange={(e) =>
                setForm({ ...form, tipoTransporte: e.target.value })
              }
            >
              {TIPOS_TRANSPORTE.map((tipoTransporte) => (
                <option key={tipoTransporte.value} value={tipoTransporte.value}>
                  {tipoTransporte.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <div className={styles.label}>Lugares disponibles:</div>
            <input
              className={styles.input}
              type="number"
              value={form.lugaresDisponibles}
              onChange={(e) =>
                setForm({ ...form, lugaresDisponibles: Number(e.target.value) })
              }
            />
          </div>
        </>
      )}

      <button className={styles.btnPrimary} type="submit">
        Enviar
      </button>
    </form>
  );
}
