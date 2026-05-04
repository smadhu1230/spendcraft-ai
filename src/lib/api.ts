// SmartSpend AI - API layer for Spring Boot backend
// Backend assumed running at http://localhost:8085
import type { Transaction, BalanceResponse, AddTransactionPayload } from "./types";

const BASE_URL = "http://localhost:8085";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  // /api/test may return text
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) return (await res.text()) as unknown as T;
  return (await res.json()) as T;
}

export const api = {
  ping: () => request<string>("/api/test"),
  getAll: () => request<Transaction[]>("/api/all"),
  getBalance: () => request<BalanceResponse>("/api/balance"),
  add: (payload: AddTransactionPayload) =>
    request<Transaction>("/api/add", { method: "POST", body: JSON.stringify(payload) }),
};

export { BASE_URL };
