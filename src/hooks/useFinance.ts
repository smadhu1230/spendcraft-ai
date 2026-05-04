// Finance store — fetches from Spring Boot API, falls back to mock data
import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { mockTransactions } from "@/lib/mockData";
import type { Transaction, AddTransactionPayload } from "@/lib/types";

export function useFinance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getAll();
      setTransactions(Array.isArray(data) && data.length ? data : mockTransactions);
      setUsingMock(!(Array.isArray(data) && data.length));
    } catch {
      setTransactions(mockTransactions);
      setUsingMock(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = useCallback(async (payload: AddTransactionPayload) => {
    const optimistic: Transaction = {
      id: Date.now(),
      status: "completed",
      date: payload.date || new Date().toISOString().slice(0, 10),
      ...payload,
    };
    setTransactions((prev) => [optimistic, ...prev]);
    try { await api.add(payload); } catch { /* offline → keep optimistic */ }
  }, []);

  const remove = useCallback((id: Transaction["id"]) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Derived metrics
  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount || 0), 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount || 0), 0);
  const balance = income - expense;
  const savingsRate = income > 0 ? Math.max(0, Math.round(((income - expense) / income) * 100)) : 0;

  return { transactions, loading, usingMock, add, remove, reload: load, income, expense, balance, savingsRate };
}
