"use client";

import { useEffect, useState } from "react";

interface StatusResponse {
  api: string;
  db: string;
  db_latency_ms: number;
  uptime: number;
  timestamp: string;
}

export default function Home() {
  const [data, setData] = useState<StatusResponse | null>(null);

  async function cargar() {
    try {
      const res = await fetch(
        "https://api-neon-gwww.onrender.com/dashboard/status",
        { cache: "no-store" }
      );
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error al cargar datos del dashboard:", err);
    }
  }

  useEffect(() => {
    cargar();
    const interval = setInterval(cargar, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard ERP — Estado del Sistema</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card titulo="API" valor={data?.api ?? "..."} />
        <Card titulo="Base de Datos" valor={data?.db ?? "..."} />
        <Card titulo="Latencia BD (ms)" valor={data?.db_latency_ms ?? "..."} />
        <Card titulo="Uptime (s)" valor={data?.uptime?.toFixed(1) ?? "..."} />
      </div>

      <p className="text-sm opacity-60 mt-8">
        Última actualización: {data?.timestamp ?? "Cargando..."}
      </p>
    </main>
  );
}

function Card({ titulo, valor }: { titulo: string; valor: any }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
      <p className="text-slate-400 text-sm">{titulo}</p>
      <p className="text-3xl font-bold mt-2">{valor}</p>
    </div>
  );
}
