const API_BASE = "http://localhost:8085/api";

export async function getTransactions() {
  const response = await fetch(`${API_BASE}/all`);
  return response.json();
}

export async function addTransaction(transaction: any) {
  const response = await fetch(`${API_BASE}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });

  return response.text();
}

export async function getBalance() {
  const response = await fetch(`${API_BASE}/balance`);
  return response.text();
}
