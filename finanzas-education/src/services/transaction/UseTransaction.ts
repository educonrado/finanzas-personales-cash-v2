import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { ref, Ref, onMounted } from "vue";
import { db } from "../firebase/firebase";
import { Transaction } from '@/modules/transactions/Transaction';

export const useTransactions = (month: number) => {
    const transactions: Ref<Transaction[]> = ref([]);
    onMounted(() => {
        const q = query(collection(db, 'transactions'), limit(10));
        onSnapshot(q, (querySnapshot) => {
            transactions.value = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return { uid: doc.id, ...data } as Transaction;
            });
        });
    });
    return { transactions };
};