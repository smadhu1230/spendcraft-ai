// Mock fallback data so the UI is rich even without a running backend
import type { Transaction } from "./types";

export const mockTransactions: Transaction[] = [
  { id: 1, type: "income", amount: 45000, description: "Monthly Salary", category: "Salary", date: "2026-05-01", status: "completed" },
  { id: 2, type: "expense", amount: 1200, description: "Groceries — BigBasket", category: "Food", date: "2026-05-02", status: "completed" },
  { id: 3, type: "expense", amount: 450, description: "Uber to office", category: "Travel", date: "2026-05-02", status: "completed" },
  { id: 4, type: "expense", amount: 2999, description: "Wireless headphones", category: "Shopping", date: "2026-05-03", status: "completed" },
  { id: 5, type: "expense", amount: 1800, description: "Electricity bill", category: "Bills", date: "2026-05-03", status: "pending" },
  { id: 6, type: "expense", amount: 320, description: "Coffee & snacks", category: "Food", date: "2026-05-04", status: "completed" },
  { id: 7, type: "income", amount: 8000, description: "Freelance project", category: "Salary", date: "2026-04-28", status: "completed" },
  { id: 8, type: "expense", amount: 650, description: "Movie night", category: "Other", date: "2026-04-26", status: "completed" },
  { id: 9, type: "expense", amount: 1450, description: "Internet bill", category: "Bills", date: "2026-04-25", status: "completed" },
  { id: 10, type: "expense", amount: 980, description: "Dinner with friends", category: "Food", date: "2026-04-22", status: "completed" },
];
