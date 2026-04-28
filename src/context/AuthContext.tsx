"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authApi, RateLimitError, type UserInfo } from "@/lib/authApi";

const TOKEN_KEY = "pasorapido_token";

type LoginResult =
  | { ok: true }
  | { ok: false; message: string; remainingSeconds?: number };

type AuthContextValue = {
  token: string | null;
  userData: UserInfo | null;
  isLoggedIn: boolean;
  isInitialized: boolean;
  login: (correo: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function storeToken(t: string) {
  try {
    localStorage.setItem(TOKEN_KEY, t);
  } catch {
    /* noop */
  }
}

function loadToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function removeToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* noop */
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Restore token on mount (client-only)
  useEffect(() => {
    const t = loadToken();
    if (!t) {
      setIsInitialized(true);
      return;
    }
    setToken(t);
    authApi
      .getCurrentUser(t)
      .then((user) => setUserData(user))
      .catch(() => {
        removeToken();
        setToken(null);
      })
      .finally(() => setIsInitialized(true));
  }, []);

  const refreshUser = useCallback(async () => {
    const t = loadToken();
    if (!t) return;
    try {
      const user = await authApi.getCurrentUser(t);
      setUserData(user);
    } catch {
      /* noop */
    }
  }, []);

  const login = useCallback(
    async (correo: string, password: string): Promise<LoginResult> => {
      try {
        const res = await authApi.login({ correo, password });
        storeToken(res.access_token);
        setToken(res.access_token);
        const user = await authApi.getCurrentUser(res.access_token);
        setUserData(user);
        return { ok: true };
      } catch (e) {
        if (e instanceof RateLimitError) {
          return {
            ok: false,
            message: e.message,
            remainingSeconds: e.remainingSeconds,
          };
        }
        return { ok: false, message: (e as Error).message };
      }
    },
    [],
  );

  const logout = useCallback(() => {
    removeToken();
    setToken(null);
    setUserData(null);
  }, []);

  const value = useMemo(
    (): AuthContextValue => ({
      token,
      userData,
      isLoggedIn: !!token,
      isInitialized,
      login,
      logout,
      refreshUser,
    }),
    [token, userData, isInitialized, login, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
