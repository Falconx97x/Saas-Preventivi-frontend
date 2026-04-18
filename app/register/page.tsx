"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Errore registrazione");
      return;
    } else {
      alert("Registrazione avvenuta con successo! Effettua il login.");
    }
    
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen w-full bg-gray-100 ">
      <h2 style={{color: "black", fontWeight: "bold", fontSize: "1.5rem", padding: "10px"}}>Registrazione</h2>

      <input style={{color: "black", border: "1px solid black", 
                padding: "8px", borderRadius: "4px", minWidth: "25%"}}
        
                placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input style={{color: "black", border: "1px solid black", 
                padding: "8px", borderRadius: "4px", minWidth: "25%"}}
        
                placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button style={{color: "black", border: "1px solid black", 
                padding: "10px", borderRadius: "4px", backgroundColor: "lightgreen"}}
            
            onClick={handleRegister}>Registrati</button>

            <br /> <br />

        <h3 style={{color: "black", fontWeight: "bold"}}>Gia registrato?</h3>
        <br />

        <button style={{color: "black", border: "1px solid black", 
                padding: "10px", borderRadius: "4px"}}

                onClick={() => window.location.href = "/login"}>Accedi
        </button>
    </div>
  );
}