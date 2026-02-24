"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ESTADOS_ASADO } from "@/lib/opciones";
import Link from "next/link";
import styles from "./page.module.css";

export default function Page() {
  const [form, setForm] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    lugar: "",
    estado: "planeado",
    participantes: [],
  });
  const [newParticipant, setNewParticipant] = useState("");

  const router = useRouter();

  function handleAddParticipant() {
    const updatedParticipants = [...form.participantes, newParticipant];
    setForm({ ...form, participantes: updatedParticipants });
    setNewParticipant("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/asados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    router.push(`/asado/${data.id}`);
  }

  return (
    <>
      <div className={styles.screen}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🔥</div>
          <div className={styles.logoText}>
            El<span>Asado</span>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.eyebrow}>Nuevo asado</div>
            <h1 className={styles.title}>Planificá tu asado</h1>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>¿Cual es la ocasión?</label>
              <input
                className={styles.input}
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Fecha:</label>
              <input
                className={styles.input}
                type="date"
                value={form.fecha}
                onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Hora:</label>
              <input
                className={styles.input}
                type="time"
                value={form.hora}
                onChange={(e) => {
                  setForm({ ...form, hora: e.target.value });
                }}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Lugar:</label>
              <input
                className={styles.input}
                value={form.lugar}
                onChange={(e) => setForm({ ...form, lugar: e.target.value })}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Estado:</label>
              <select
                className={styles.select}
                value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value })}
              >
                {ESTADOS_ASADO.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>¿Quienes van?</label>
              <div className={styles.participantRow}>
                <input
                  className={styles.input}
                  value={newParticipant}
                  onChange={(e) => setNewParticipant(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddParticipant();
                    }
                  }}
                />
                <button
                  className={styles.btnSecondary}
                  type="button"
                  onClick={handleAddParticipant}
                >
                  + Agregar
                </button>
              </div>
              <ul className={styles.participantList}>
                {form.participantes.map((person, index) => (
                  <li className={styles.participantTag} key={index}>
                    {person}
                  </li>
                ))}
              </ul>
            </div>

            <button className={styles.btnPrimary} type="submit">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
