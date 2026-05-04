// Shared types for SmartSpend AI
export type TransactionType = "income" | "expense";

export type Category =
  | "Food"
  | "Travel"
  | "Shopping"
  | "Bills"
  | "Salary"
  | "Other";

export interface Transaction {
  id?: number | string;
  type: TransactionType;
  amount: number;
  description?: string;
  category?: Category;
  date?: string; // ISO
  status?: "completed" | "pending";
}

export interface BalanceResponse {
  balance?: number;
  income?: number;
  expense?: number;
  // Spring Boot may return a number directly — handled in caller
  [k: string]: unknown;
}

export interface AddTransactionPayload {
  type: TransactionType;
  amount: number;
  description?: string;
  category?: Category;
  date?: string;
}
