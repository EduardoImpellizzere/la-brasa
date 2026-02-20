"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TransporteForm({ id }) {
  const [form, setForm] = useState({
    nombre: "",
    rol: "",
    tipoTransporte: "",
    lugaresDisponibles: 0,
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:3000/api/asados/${id}/transporte`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );

    router.refresh();
    setForm({
      nombre: "",
      rol: "",
      tipoTransporte: "",
      lugaresDisponibles: 0,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />
      <input
        value={form.rol}
        onChange={(e) => setForm({ ...form, rol: e.target.value })}
      />
      <input
        value={form.tipoTransporte}
        onChange={(e) => setForm({ ...form, tipoTransporte: e.target.value })}
      />
      <input
        value={form.lugaresDisponibles}
        onChange={(e) =>
          setForm({ ...form, lugaresDisponibles: e.target.value })
        }
      />

      <button type="submit">Enviar</button>
    </form>
  );
}
