"use server";

import { signIn, signOut } from "@/app/auth";

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function credentialLogin(formData) {
  await signIn("credentials", {
    email: formData.email,
    password: formData.password,
    redirectTo: "/",
  });
}
