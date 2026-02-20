"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ItemForm({ id }) {
  const [form, setForm] = useState({
    nombre: "",
    quien: "",
    estado: "pendiente",
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:3000/api/asados/${id}/items`,
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
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />
      <input
        value={form.quien}
        onChange={(e) => setForm({ ...form, quien: e.target.value })}
      />
      <input
        value={form.estado}
        onChange={(e) => setForm({ ...form, estado: e.target.value })}
      />

      <button type="submit">Enviar</button>
    </form>
  );
}
