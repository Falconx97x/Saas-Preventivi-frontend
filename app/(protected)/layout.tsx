"use client";

import Link from "next/link";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import {useAuthContext} from "@/src/context/AuthContext";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen w-full">
        <aside className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col justify-between">
          
          <div>
            <h1 className="text-xl font-bold mb-6">SaaS Preventivi</h1>

            <nav className="flex flex-col gap-3">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/clients">Clienti</Link>
              <Link href="/quotes">Preventivi</Link>
              <Link href="/create-quote">Nuovo Preventivo</Link>
            </nav>
          </div>

          <div className="flex flex-col gap-3 padding-bottom-4">
            {!useAuthContext().isAuthenticated ? (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Registrati</Link>
              </>
            ) : (
              <button
                onClick={useAuthContext().logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            )}
          </div>

        </aside>

        <main className="flex-1 p-6 bg-gray-100 min-h-screen w-full">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}


