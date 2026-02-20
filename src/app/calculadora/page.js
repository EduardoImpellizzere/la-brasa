"use client";

import { calcularCarne, TIPOS_ASADO } from "@/lib/calculadora";
import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    tipo: TIPOS_ASADO[0].value,
    totalPersonas: 0,
  });

  const resultado = calcularCarne(form.totalPersonas, form.tipo);

  return (
    <div>
      <form>
        <p>Tipo de asado:</p>
        <select
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
        >
          {TIPOS_ASADO.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <p>Cantidad de personas:</p>
        <input
          type="number"
          value={form.totalPersonas}
          onChange={(e) =>
            setForm({ ...form, totalPersonas: Number(e.target.value) })
          }
        />
      </form>
      <p>Total KG: {resultado.totalKg}</p>
      {resultado.desglose.map((item) => (
        <ul key={item.nombre}>
          <li>{item.nombre}</li>
          <li>{item.kg}</li>
        </ul>
      ))}
    </div>
  );
}
