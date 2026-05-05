import { useEffect, useState } from "react";
import { getTransactions, getBalance, addTransaction } from "@/lib/api";

export function useFinance() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const loadData = async () => {
    const txns = await getTransactions();
    const bal = await getBalance();

    setTransactions(txns);
    setBalance(Number(bal));
  };

  useEffect(() => {
    loadData();
  }, []);

  const createTransaction = async (data: any) => {
    await addTransaction(data);
    loadData();
  };

  return {
    transactions,
    balance,
    createTransaction,
  };
}
