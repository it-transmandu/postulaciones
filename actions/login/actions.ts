"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function loginSinAuth(formData: FormData) {
  const dni = formData.get("dni") as string;

  if (!dni) return { error: "El DNI es obligatorio" };

  // Verificamos si el usuario existe en la base de datos
  const user = await prisma.user.findUnique({
    where: { dni: dni.trim() },
  });

  if (!user) {
    return { error: "Número de identificación no registrado" };
  }

  // Si existe, lo mandamos a su panel
  // Nota: Al no usar NextAuth, no hay "sesión" técnica,
  // la seguridad dependerá de conocer el DNI en la URL.
  redirect(`/directores/${dni}`);
}
