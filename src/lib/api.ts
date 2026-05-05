const BASE_URL = "http://localhost:8085/api";

export async function addTransaction(data: any) {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.text();
}

export async function getAllTransactions() {
  const response = await fetch(`${BASE_URL}/all`);
  return response.json();
}

export async function getBalance() {
  const response = await fetch(`${BASE_URL}/balance`);
  return response.text();
}
