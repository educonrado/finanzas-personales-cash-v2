import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { ref, Ref, onMounted } from "vue";
import { auth, db } from "../firebase/firebase";
import { Transaction } from '@/modules/transactions/Transaction';

export const useTransactions = (month: number) => {
    const transactions: Ref<Transaction[]> = ref([]);
    const user = auth.currentUser;
    onMounted(() => {
        if (user) {
           const q = query(collection(db, 'users', user.uid, 'transactions'), limit(10));
        onSnapshot(q, (querySnapshot) => {
            transactions.value = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return { uid: doc.id, ...data } as Transaction;
            });
        }); 
        } else {
            throw new Error("No se ha iniciado sesión");
            
        }
        
    });
    return { transactions };
};