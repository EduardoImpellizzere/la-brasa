"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GastosForm({ id, participantes = [] }) {
  const [form, setForm] = useState({
    quien: participantes[0] ?? "",
    descripcion: "",
    monto: 0,
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`http://localhost:3000/api/asados/${id}/gastos`, {
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
    <form onSubmit={handleSubmit}>
      <p>Quien:</p>
      <select
        value={form.quien}
        onChange={(e) => setForm({ ...form, quien: e.target.value })}
      >
        {participantes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <p>Cuanto:</p>
      <input
        type="number"
        value={form.monto}
        onChange={(e) => setForm({ ...form, monto: Number(e.target.value) })}
      />

      <p>En que?</p>
      <input
        value={form.descripcion}
        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
      />

      <button type="submit">Enviar</button>
    </form>
  );
}
