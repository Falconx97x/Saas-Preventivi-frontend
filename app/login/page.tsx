"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    
  if (!res.ok) {
    const text = await res.text();
    console.error("Errore server:", text);
    return;
  }

    const data = await res.json();
    console.log("Login Response: ",data);

    if (data.token) {
      localStorage.setItem("token", data.token);

    alert("Login avvenuto con successo!" );

      // redirect dashboard
      window.location.href = "/dashboard";
    } else {
      alert("Errore login");
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen w-full bg-gray-100 ">
      <h2 style={{color: "black", fontWeight: "bold", fontSize: "1.5rem", padding: "10px"}}>Login</h2>

      <input  className="text-black border border-black p-2 rounded-md min-w-[25%]"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input style={{color: "black", border: "1px solid black", 
                padding: "8px", borderRadius: "4px", minWidth: "25%"}}

        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button style={{color: "black", border: "1px solid black", 
                padding: "10px", borderRadius: "4px", backgroundColor: "lightgreen"}}
                
                onClick={handleLogin}>Accedi</button>

        <br /> <br />

        <h3 style={{color: "black", fontWeight: "bold"}}>Non hai un account?</h3>
        <br />

        <button style={{color: "black", border: "1px solid black", 
                padding: "10px", borderRadius: "4px"}}

                onClick={() => window.location.href = "/register"}>Registrati
        </button>

    </div>
  );
}