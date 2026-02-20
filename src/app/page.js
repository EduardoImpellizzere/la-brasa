"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ESTADOS_ASADO } from "@/lib/opciones";
import Link from "next/link";

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
      <form onSubmit={handleSubmit}>
        <p>Nombre:</p>
        <input
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />

        <p>Fecha:</p>
        <input
          type="date"
          value={form.fecha}
          onChange={(e) => setForm({ ...form, fecha: e.target.value })}
        />

        <p>Hora:</p>
        <input
          type="time"
          value={form.hora}
          onChange={(e) => setForm({ ...form, hora: e.target.value })}
        />

        <p>Lugar:</p>
        <input
          value={form.lugar}
          onChange={(e) => setForm({ ...form, lugar: e.target.value })}
        />

        <p>Estado:</p>
        <select
          value={form.estado}
          onChange={(e) => setForm({ ...form, estado: e.target.value })}
        >
          {ESTADOS_ASADO.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <p>Participantes:</p>
        <input
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
        />
        <button type="button" onClick={handleAddParticipant}>
          Agregar
        </button>
        <ul>
          {form.participantes.map((person) => (
            <li key={person}>{person}</li>
          ))}
        </ul>

        <button type="submit">Enviar</button>
      </form>

      <Link href={"/calculadora"}>Calculadora</Link>
    </>
  );
}
