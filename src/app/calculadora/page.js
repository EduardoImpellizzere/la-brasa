"use client";

import { calcularCarne } from "@/lib/calculadora";
import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    tipo: "normal",
    totalPersonas: 0,
  });

  const resultado = calcularCarne(form.totalPersonas, form.tipo);

  return (
    <div>
      <form>
        <input
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
        />
        <input
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
