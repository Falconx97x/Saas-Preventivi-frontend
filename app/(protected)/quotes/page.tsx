"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/src/lib/api";
import ProtectedRoute from "@/src/components/ProtectedRoute";

interface Quote {
  id: number;
  title: string;
  total: number;
  status: string;
  client?: { name: string };
  items: any[];
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    try {
      const data = await authFetch("/quotes");
      setQuotes(data);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Elimina preventivo
  const deleteQuote = async (id: number) => {
    if (!confirm("Sei sicuro?")) return;

    try {
      await authFetch(`/quotes/${id}`, {
        method: "DELETE",
      });

      fetchQuotes();
      
    } catch (error: any) {
      alert(error.message);
    }
  };

  const sendEmail = async (id: number) => {
    try {
      
      await authFetch(`/quotes/${id}/send-email`, {
        method: "POST",
      });
      
      alert("Email inviata!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Aggiorna stato preventivo
  const updateStatus = async (id: number, status: string) => {
    try {
      await authFetch(`/quotes/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      fetchQuotes();
    
    } catch (error: any) {
      alert(error.message);
    }
  };
  
  

  useEffect(() => {
    fetchQuotes();
  }, []);

  if (loading) return <p>Caricamento...</p>;

  return (
    <ProtectedRoute>
    <div style={{ padding: 20, color: "black" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>
        Preventivi
      </h1>

      {quotes.length === 0 ? (
        <p>Nessun preventivo</p>
      ) : (
        quotes.map((q) => (
          <div key={q.id} style={{ border: "1px solid #ccc", padding: 15, marginBottom: 10 }}>
            <h3>{q.title}</h3>

            <p>Cliente: {q.client?.name}</p>
            <p>Totale: € {q.total}</p>
            <p>Stato: {q.status}</p>

            <ul>
              {q.items.map((item: any) => (
                <li key={item.id}>
                  {item.description} - {item.quantity} x €{item.price}
                </li>
              ))}
            </ul>

            <button style={{fontWeight: "bold", border: "2px solid black", background:"red",
                    color: "white", padding: "5px 10px", marginRight: "10px"}}
            
              onClick={() => deleteQuote(q.id)}>Elimina</button>

            {/* 🔥 FIX PDF */}
            <button style={{fontWeight: "bold", border: "2px solid black", background:"green",
                    color: "white", padding: "5px 10px", marginRight: "10px"}}
            
              onClick={() => {
                const token = localStorage.getItem("token");
                window.open(
                  `http://localhost:3001/quotes/${q.id}/pdf?token=${token}`,
                  "_blank"
                );
              }}
            >
              Scarica PDF
            </button>

            <button style={{fontWeight: "bold", border: "2px solid black", background:"blue",
                    color: "white", padding: "5px 10px", marginRight: "10px"}}
            
            
                onClick={() => sendEmail(q.id)}>
              Invia Email
            </button>

            <select style={{fontWeight: "bold", border: "2px solid black", background:"white",
                    color: "black", padding: "5px 10px", marginRight: "10px"}}
            
              value={q.status}
              onChange={(e) => updateStatus(q.id, e.target.value)}
            >
              <option value="draft">Bozza</option>
              <option value="sent">Inviato</option>
              <option value="accepted">Accettato</option>
              <option value="rejected">Rifiutato</option>
            </select>
          </div>
        ))
      )}
    </div>
    </ProtectedRoute>
  );
}