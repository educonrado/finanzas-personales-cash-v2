import { ref } from "vue";

export interface Transaction {
  id: number;
  date: Date;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string;
  account: string;
}

const transactions = ref<Transaction[]>([]);

export const addTransaction = (transaction: Transaction) => {
  transactions.value.push(transaction);
};

export const getTransactions = (): Transaction[] => {
  return transactions.value;
};

export const updateTransaction = (updateTransaction: Transaction) => {
  const index = transactions.value.findIndex(t => t.id === updateTransaction.id);
  if(index !== -1) {
    transactions.value[index] = updateTransaction;
  }
};

export const deleteTransaction = (id: number) => {
  transactions.value = transactions.value.filter(t => t.id !== id);
}
