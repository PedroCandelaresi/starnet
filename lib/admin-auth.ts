import { createHash, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "starnet_admin";

const SESSION_MAX_AGE = 60 * 60 * 12;

function getAdminSecret() {
  return process.env.ADMIN_SECRET?.trim() ?? "";
}

function buildSessionValue(secret: string) {
  return createHash("sha256").update(`starnet:${secret}`).digest("hex");
}

export function isAdminConfigured() {
  return Boolean(getAdminSecret());
}

export function validateAdminSecret(input: string) {
  const expected = getAdminSecret();
  const received = input.trim();

  if (!expected || !received) {
    return false;
  }

  const expectedBuffer = Buffer.from(buildSessionValue(expected));
  const receivedBuffer = Buffer.from(buildSessionValue(received));

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function isAdminAuthenticated() {
  if (!isAdminConfigured()) {
    return false;
  }

  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  return sessionValue === buildSessionValue(getAdminSecret());
}

export async function createAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, buildSessionValue(getAdminSecret()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete({
    name: ADMIN_SESSION_COOKIE,
    path: "/admin",
  });
}
