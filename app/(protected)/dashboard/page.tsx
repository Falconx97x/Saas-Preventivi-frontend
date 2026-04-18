"use client";

import { useEffect, useState } from "react";
import { authFetch, getDashboard } from "@/src/lib/api";
import { useAuth } from "@/src/lib/useAuth";
import ProtectedRoute from "@/src/components/ProtectedRoute";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  useAuth();



  useEffect(() => {
    getDashboard()
      .then((res) =>{
        console.log("Dashboard data:", res); 
        setData(res);
      })
      .catch((err) => {
        console.error("Error fetching dashboard:", err);
      });
  }, []);

  if (!data) return <p className="text-black">Loading...</p>;

  return (
    <ProtectedRoute>
    <div className="text-black background-gray-100 min-h-screen p-6 width-full">
      <h1 className="text-2xl font-bold mb-4 text-black">Dashboard</h1>

      <div className="bg-white p-4 rounded shadow">
        <p>💰 Totale: €{data.totalRevenue}</p>
        <p>📄 Preventivi: {data.totalQuotes}</p>
      </div>
      <br></br>
    <div className="bg-white p-4 rounded shadow">
      <h3 className="mt-4 font-bold">Per stato:</h3>
      <ul>
        {data.quotesByStatus.map((s: any) => (
          <li key={s.status}>
            {s.status}: {s._count}
          </li>
        ))}
      </ul>
    </div>
        <br />
    <div className="bg-white p-4 rounded shadow">
      <h3 className="mt-4 font-bold">Top clienti:</h3>
      <ul>
        {data.topClients.map((c: any) => (
          <li key={c.id}>
            {c.name} - €{c.total}
          </li>
        ))}
      </ul>
    </div>
    </div>
    </ProtectedRoute>
  );
}

