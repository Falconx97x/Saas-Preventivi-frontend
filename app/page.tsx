import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <button style={{color: "black", border: "1px solid black", 
                padding: "10px", borderRadius: "4px"}}

                onClick={() => window.location.href = "/register"}>Registrati
        </button>

        <button style={{color: "black", border: "1px solid black", 
                padding: "10px", borderRadius: "4px"}}

                onClick={() => window.location.href = "/login"}>Accedi
        </button>
        
      </main>
    </div>
  );
}
