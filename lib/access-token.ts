import { createHmac, timingSafeEqual } from "node:crypto";

type PlanTier = "starter" | "pro";

type AccessTokenPayload = {
  customerId: string;
  subscriptionId: string;
  plan: PlanTier;
  iat: number;
  exp: number;
};

const TOKEN_VERSION = "v1";

function encode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payloadB64: string, secret: string) {
  return createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

export function createAccessToken(
  data: Pick<AccessTokenPayload, "customerId" | "subscriptionId" | "plan">,
  secret: string,
  ttlSeconds = 60 * 60 * 24 * 30
) {
  const now = Math.floor(Date.now() / 1000);
  const payload: AccessTokenPayload = {
    ...data,
    iat: now,
    exp: now + ttlSeconds
  };

  const payloadJson = JSON.stringify(payload);
  const payloadB64 = encode(payloadJson);
  const signature = signPayload(payloadB64, secret);

  return `${TOKEN_VERSION}.${payloadB64}.${signature}`;
}

export function verifyAccessToken(token: string, secret: string) {
  const [version, payloadB64, signature] = token.split(".");

  if (version !== TOKEN_VERSION || !payloadB64 || !signature) {
    return null;
  }

  const expected = signPayload(payloadB64, secret);

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (sigBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(sigBuffer, expectedBuffer)) {
    return null;
  }

  let parsed: AccessTokenPayload;

  try {
    parsed = JSON.parse(decode(payloadB64)) as AccessTokenPayload;
  } catch {
    return null;
  }

  if (!parsed.customerId || !parsed.subscriptionId || !parsed.plan || !parsed.exp || !parsed.iat) {
    return null;
  }

  if (parsed.exp <= Math.floor(Date.now() / 1000)) {
    return null;
  }

  return parsed;
}
