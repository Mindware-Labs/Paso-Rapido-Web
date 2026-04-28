const BASE_URL = "/api-proxy";
const DEFAULT_TIMEOUT_MS = 15_000;
const KYC_TIMEOUT_MS = 30_000;

export class RateLimitError extends Error {
  constructor(
    message: string,
    public readonly remainingSeconds: number,
  ) {
    super(message);
    this.name = "RateLimitError";
  }
}

export type RegisterPayload = {
  primerNombre: string;
  segundoNombre?: string;
  cedula: string;
  correo: string;
  telefono: string;
  password: string;
};

export type RegisterResponse = {
  id: string;
  primerNombre: string;
  cedula: string;
  correo: string;
  [key: string]: unknown;
};

export type LoginPayload = {
  correo: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
};

export type UserInfo = {
  id: string;
  primerNombre: string;
  segundoNombre?: string | null;
  cedula: string;
  correo: string;
  telefono: string;
  kycStatus: string;
  createdAt: string;
};

export type KycSessionResponse = {
  sessionToken: string;
  sessionId: string;
  url: string;
};

export type PendingKycStatus =
  | "pending"
  | "id_verified"
  | "complete"
  | "failed";

export type PendingSessionStatusResponse = {
  status: PendingKycStatus;
  message?: string;
  userId?: string;
};

type ApiError = { message: string | string[] };

// Fetch helpers

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("La solicitud tardÃ³ demasiado. Intenta nuevamente.");
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<T> {
  const res = await fetchWithTimeout(
    `${BASE_URL}${path}`,
    {
      headers: { "Content-Type": "application/json" },
      ...options,
    },
    timeoutMs,
  );
  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : {};
  if (!res.ok) {
    if (res.status === 429) {
      const body = data as { message: string; remainingSeconds: number };
      throw new RateLimitError(body.message, body.remainingSeconds ?? 300);
    }
    const err = data as ApiError;
    const msg = Array.isArray(err.message) ? err.message[0] : err.message;
    throw new Error(msg ?? "Error de servidor");
  }
  return data as T;
}

async function requestWithAuth<T>(
  path: string,
  token: string,
  options: RequestInit = {},
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<T> {
  const res = await fetchWithTimeout(
    `${BASE_URL}${path}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...options,
    },
    timeoutMs,
  );
  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : {};
  if (!res.ok) {
    if (res.status === 429) {
      const body = data as { message: string; remainingSeconds: number };
      throw new RateLimitError(body.message, body.remainingSeconds ?? 300);
    }
    const err = data as ApiError;
    const msg = Array.isArray(err.message) ? err.message[0] : err.message;
    throw new Error(msg ?? "Error de servidor");
  }
  return data as T;
}

async function requestMultipart<T>(
  path: string,
  formData: FormData,
  timeoutMs = KYC_TIMEOUT_MS,
): Promise<T> {
  const res = await fetchWithTimeout(
    `${BASE_URL}${path}`,
    { method: "POST", body: formData },
    timeoutMs,
  );
  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : {};
  if (!res.ok) {
    const err = data as ApiError;
    const msg = Array.isArray(err.message) ? err.message[0] : err.message;
    throw new Error(msg ?? "Error de servidor");
  }
  return data as T;
}

// API Surface

export const authApi = {
  checkCedula: (cedula: string) =>
    request<{ exists: boolean }>(
      "/auth/check-cedula",
      { method: "POST", body: JSON.stringify({ cedula }) },
      12_000,
    ),

  checkEmail: (correo: string) =>
    request<{ exists: boolean }>(
      "/auth/check-email",
      { method: "POST", body: JSON.stringify({ correo }) },
      12_000,
    ),

  register: (payload: RegisterPayload) =>
    request<RegisterResponse>(
      "/auth/register",
      { method: "POST", body: JSON.stringify(payload) },
      15_000,
    ),

  login: (payload: LoginPayload) =>
    request<LoginResponse>(
      "/auth/login",
      { method: "POST", body: JSON.stringify(payload) },
      12_000,
    ),

  getCurrentUser: (token: string) =>
    requestWithAuth<UserInfo>("/auth/me", token, { method: "GET" }, 12_000),

  createKycSession: (userId: string) =>
    request<KycSessionResponse>(
      "/auth/kyc/session",
      { method: "POST", body: JSON.stringify({ userId }) },
      20_000,
    ),

  // Pending KYC registration

  createPendingKycSession: (payload: RegisterPayload) =>
    request<{ sessionId: string }>(
      "/auth/kyc/pending-session",
      { method: "POST", body: JSON.stringify(payload) },
      15_000,
    ),

  getPendingKycStatus: (sessionId: string) =>
    request<PendingSessionStatusResponse>(
      `/auth/kyc/pending-session/${sessionId}/status`,
      { method: "GET" },
      10_000,
    ),

  verifyIdForPending: (sessionId: string, front: File, back?: File) => {
    const form = new FormData();
    form.append("front_image", front);
    if (back) form.append("back_image", back);
    return requestMultipart<{ status: PendingKycStatus; message?: string }>(
      `/auth/kyc/pending-session/${sessionId}/verify-id`,
      form,
    );
  },

  verifyFaceForPending: (sessionId: string, selfie: File) => {
    const form = new FormData();
    form.append("selfie", selfie);
    return requestMultipart<{ status: PendingKycStatus; message?: string }>(
      `/auth/kyc/pending-session/${sessionId}/verify-face`,
      form,
    );
  },

  sendEmailOtp: (correo: string) =>
    request<void>(
      "/auth/kyc/email/send",
      { method: "POST", body: JSON.stringify({ email: correo }) },
      10_000,
    ),

  checkEmailOtp: (correo: string, code: string) =>
    request<{ verified: boolean }>(
      "/auth/kyc/email/check",
      { method: "POST", body: JSON.stringify({ email: correo, code }) },
      10_000,
    ),
};
