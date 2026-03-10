const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 10 * 60 * 1000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as unknown as {
  leadRateLimitStore: Map<string, RateLimitEntry> | undefined;
};

const store = globalForRateLimit.leadRateLimitStore ?? new Map<string, RateLimitEntry>();

if (!globalForRateLimit.leadRateLimitStore) {
  globalForRateLimit.leadRateLimitStore = store;
}

function getLimit() {
  const configured = Number(process.env.LEAD_RATE_LIMIT_MAX ?? DEFAULT_LIMIT);

  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_LIMIT;
}

function getWindowMs() {
  const configured = Number(process.env.LEAD_RATE_LIMIT_WINDOW_MS ?? DEFAULT_WINDOW_MS);

  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_WINDOW_MS;
}

function cleanupExpiredEntries(now: number) {
  for (const [key, value] of store.entries()) {
    if (value.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

export function rateLimitLeadSubmission(key: string): RateLimitResult {
  const now = Date.now();
  const limit = getLimit();
  const windowMs = getWindowMs();

  cleanupExpiredEntries(now);

  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    const next = {
      count: 1,
      resetAt: now + windowMs,
    };

    store.set(key, next);

    return {
      allowed: true,
      remaining: Math.max(limit - 1, 0),
      resetAt: next.resetAt,
    };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;
  store.set(key, existing);

  return {
    allowed: true,
    remaining: Math.max(limit - existing.count, 0),
    resetAt: existing.resetAt,
  };
}
