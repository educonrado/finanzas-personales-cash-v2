import { Transaction } from "@/modules/transactions/Transaction";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const documentoTransacciones = "transactions";
const users = "users";

export const addTransactionFirebase = async (transaction: Omit<Transaction, 'uid'>) => {
    const user = auth.currentUser;
    if (user) {
        const transactionsCollectionRef = collection(db, users, user.uid, documentoTransacciones);
        await addDoc(transactionsCollectionRef, transaction);
    } else {
        throw new Error("No se ha iniciado sesión");
    }
};

export const getTransactionFirebase = async (): Promise<Transaction[]> => {
    const user = auth.currentUser;
    if (user) {
        const transactionsCollectionRef = collection(db, users, user.uid, documentoTransacciones);
        const querySnapshot = await getDocs(transactionsCollectionRef);
        return querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }) as Transaction);
    } else {
        throw new Error("No se ha iniciado sesión");
    }
};

export const updateTransactionFirebase = async (transactionId: string, updates: Partial<Transaction>): Promise<void> => {
    const user = auth.currentUser;
    if (user) {
        await updateDoc(doc(db, users, user.uid, documentoTransacciones, transactionId), updates);
    } else {
        throw new Error("No se ha iniciado sesión");
    }
};

export const deleteTransactionFirebase = async (transactionId: string): Promise<void> => {
    const user = auth.currentUser;
    if (user) {
        await deleteDoc(doc(db, users, user.uid, documentoTransacciones, transactionId));
    } else {
        throw new Error("No se ha iniciado sesión");
    }
};

export const getTransactionsByMonth = async (month: number): Promise<Transaction[]> => {
    const user = auth.currentUser;
    if (user) {
        const q = query(collection(db, users, user.uid, documentoTransacciones),
            where("type", "==", "income")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ ...doc.data() }) as Transaction);
    } else {
        throw new Error("No se ha iniciado sesión");
    }
};