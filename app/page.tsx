"use client";

import { useState } from "react";
import Link from "next/link";
import { loginSinAuth } from "@/actions/login/actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function clientAction(formData: FormData) {
    setIsLoading(true);
    setError("");

    const result = await loginSinAuth(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <main className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">

        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Bienvenido</h1>
          <p className="text-sm text-zinc-500 mt-1">Ingresa tu cédula para acceder</p>
        </div>

        {error && (
          <p className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-md text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* Usamos 'action' directamente con nuestra Server Action */}
        <form action={clientAction} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              DNI / Cédula
            </label>
            <input
              name="dni"
              type="text"
              placeholder="Ej: 12345678"
              className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black hover:bg-zinc-800 disabled:bg-zinc-400 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            {isLoading ? "Verificando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center">
          <Link href="/registrar_director" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
            ¿No tienes una cuenta? Regístrate aquí
          </Link>
        </div>
      </main>
    </div>
  );
}
