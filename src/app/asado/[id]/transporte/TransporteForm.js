"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROLES_TRANSPORTE, TIPOS_TRANSPORTE } from "@/lib/opciones";

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
    <form onSubmit={handleSubmit}>
      <p>Quien:</p>
      <select
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      >
        {participantes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <p>Rol:</p>
      <select
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

      {form.rol === "conductor" && (
        <>
          <p>Tipo de transporte:</p>
          <select
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

          <p>Lugares disponibles:</p>
          <input
            type="number"
            value={form.lugaresDisponibles}
            onChange={(e) =>
              setForm({ ...form, lugaresDisponibles: Number(e.target.value) })
            }
          />
        </>
      )}

      <button type="submit">Enviar</button>
    </form>
  );
}
