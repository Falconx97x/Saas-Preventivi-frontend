"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/src/components/ProtectedRoute";

interface Client {
  id: number;
  name: string;
  email: string;
  userId: number;
}

export default function ClientsPage() {

  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 👉 carica clienti dal backend
  const fetchClients = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3001/clients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!Array.isArray(data)) {
      console.error("Errore API:", data);
      setClients([]);
      return;
    }

      setClients(data);
    } catch (error) {
      console.error("Errore fetch clienti:", error);
      setClients([]);
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  } else {
    fetchClients(); // 🔥 chiama qui
  }
}, []);


  //elimina cliente
  const deleteClient = async (id: number) => {
    if (!confirm("Sei sicuro?")) return;
  
  try {  
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3001/clients/${id}`, {
    method: "DELETE",
    headers:{
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

      if(!res.ok){
        return alert(data.error || "Errore modifica cliente");
      }

      console.log("Cliente eliminato:", data);
      alert("Cliente eliminato correttamente");
      fetchClients(); // aggiorna lista
    } catch (error) {
      console.error("Errore modifica cliente:", error);
    }
};

  // carica clienti all'apertura
  useEffect(() => {
    fetchClients();
  }, []);

  // 👉 crea cliente nuovo
  const createClient = async () => {
    if (!name || !email) {
      alert("Inserisci nome e email");
      return;
    }
    console.log("Creazione cliente:", { name, email });

    try {

      const token = localStorage.getItem("token");

      await fetch("http://localhost:3001/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
       
       
      });

      setName("");
      setEmail("");
      fetchClients(); // aggiorna lista
    } catch (error) {
      console.error("Errore creazione cliente:", error);
    }
  };

  //Modifica Dati cliente
  const renameClient = async (id: number) => {
    const newName = prompt("Nuovo nome cliente:");
    const newEmail = prompt("Nuova email cliente:");
    if (!newName) return;
    if (!newEmail) return;
  
    try{
      
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3001/clients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName, email: newEmail }),
      });

      const data = await res.json();

      if(!res.ok){
        return alert(data.error || "Errore modifica cliente");
      }

      console.log("Cliente modificato:", data);
      alert("Cliente modificato correttamente");
      fetchClients(); // aggiorna lista
    } catch (error) {
      console.error("Errore modifica cliente:", error);
    }

  }
    

  return (
    <div className="p-8 text-black" >
      <ProtectedRoute>
      <h1 className="text-3xl font-bold mb-4">Clienti</h1>

      {/* Form cliente */}
      <div className="flex mb-6 gap-2">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={createClient}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Crea Cliente
        </button>
      </div>

      {/* Lista clienti */}
      <div>
        {clients.length === 0 ? (
          <p>Nessun cliente trovato</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Nome</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td className="border px-4 py-2">{c.id}</td>
                  <td className="border px-4 py-2">{c.name}</td>
                  <td className="border px-4 py-2">{c.email}</td>
                  <td>

                    <button 
                        className="border px-4 py-2 rounded bg-blue-500 text-white min-w-[30%]"
                        onClick={() => renameClient(c.id)}> Dati
                    </button>

                    

                    <button 
                        className="border px-4 py-2 rounded bg-red-500 text-white min-w-[30%]"
                        onClick={() => deleteClient(c.id)}> X 
                    </button>

                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      </ProtectedRoute>
    </div>
  );
}



