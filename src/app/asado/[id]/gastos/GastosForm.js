"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GastosForm({ id }) {
  const [form, setForm] = useState({
    quien: "",
    descripcion: "",
    monto: 0,
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:3000/api/asados/${id}/gastos`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.quien}
        onChange={(e) => setForm({ ...form, quien: e.target.value })}
      />
      <input
        value={form.monto}
        onChange={(e) => setForm({ ...form, monto: e.target.value })}
      />
      <input
        value={form.descripcion}
        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
      />

      <button type="submit">Enviar</button>
    </form>
  );
}
