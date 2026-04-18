"use client";

import { useEffect, useState } from "react";

export default function PublicQuotePage({ params }: any) {
  const [quote, setQuote] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/public/quotes/${params.id}`)
      .then((res) => res.json())
      .then(setQuote);
  }, []);

  if (!quote) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{quote.title}</h2>

      <p>Cliente: {quote.client.name}</p>
      <p>Email: {quote.client.email}</p>

      <h3>Items</h3>
      {quote.items.map((item: any) => (
        <div key={item.id}>
          {item.description} - {item.quantity} x €{item.price}
        </div>
      ))}

      <h2>Totale: €{quote.total}</h2>

      <button onClick={async () => {
        await fetch(`http://localhost:3001/quotes/${quote.id}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "accepted" }),
        });

        alert("Preventivo accettato!");
      }}>
        ✅ Accetta preventivo
      </button>
    </div>
  );
}