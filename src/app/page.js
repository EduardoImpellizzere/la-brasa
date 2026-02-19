"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [form, setForm] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    lugar: "",
    estado: "planeado",
    participantes: [],
  });
  const [participant, setParticipant] = useState("");

  const router = useRouter();

  function addParticipant() {
    const updatedParticipants = [...form.participantes, participant];
    setForm({ ...form, participantes: updatedParticipants });
    setParticipant("");
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
    <form onSubmit={handleSubmit}>
      <input
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />
      <input
        value={form.fecha}
        onChange={(e) => setForm({ ...form, fecha: e.target.value })}
      />
      <input
        value={form.hora}
        onChange={(e) => setForm({ ...form, hora: e.target.value })}
      />
      <input
        value={form.lugar}
        onChange={(e) => setForm({ ...form, lugar: e.target.value })}
      />
      <input
        value={form.estado}
        onChange={(e) => setForm({ ...form, estado: e.target.value })}
      />
      <input
        value={participant}
        onChange={(e) => setParticipant(e.target.value)}
      />
      <button type="button" onClick={addParticipant}>
        Agregar
      </button>

      <ul>
        {form.participantes.map((person) => (
          <li key={person}>{person}</li>
        ))}
      </ul>

      <button type="submit">Enviar</button>
    </form>
  );
}
