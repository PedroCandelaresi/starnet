"use server";

import { redirect } from "next/navigation";

import {
  clearAdminSession,
  createAdminSession,
  isAdminConfigured,
  validateAdminSecret,
} from "@/lib/admin-auth";

export async function loginAdmin(formData: FormData) {
  const secret = String(formData.get("secret") ?? "");

  if (!isAdminConfigured()) {
    redirect("/admin/leads?error=config");
  }

  if (!validateAdminSecret(secret)) {
    redirect("/admin/leads?error=invalid");
  }

  await createAdminSession();
  redirect("/admin/leads");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/leads?status=logged_out");
}
