import { Transaction } from "@/modules/transactions/Transaction";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const documentoTransacciones = "transactions";

export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, "transactions"), transaction);
        return docRef.id;
    } catch (error) {
        console.error("Error al agregar la transacción: ", error);
        throw error;        
    }
};

export const getTransaction = async(id: string): Promise<Transaction|null> =>{
    try {
        const transactionDoc = await getDoc(doc(db, documentoTransacciones, id));
        if (transactionDoc.exists()) {
            return {...transactionDoc.data()} as Transaction;
        } else {
            return null;
        }
    } catch (error) {
        console.error("No existe una transacción con el id solicitado: ", error);
        throw error;   
    }
};

export const updateTransaction = async (transactionId: string, updates: Partial<Transaction>): Promise<void> =>{
    try {
        await updateDoc(doc(db, documentoTransacciones, transactionId), updates);
    } catch (error) {
        console.error("Error al actualizar transacción: ", error);
        throw error;
    }
};

export const deleteTransaction = async(transactionId: string): Promise<void>{
    try {
        await deleteDoc(doc(db, documentoTransacciones, transactionId));
    } catch (error) {
        console.error("Error al eliminar la transacción: ", error);
        throw error;
    }
};

export const getTransactionsByMonth = async(): Promise<Transaction[]> => {
    try {
        const q = query(collection(db, documentoTransacciones), where("type", "==", "income"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({...doc.data()}) as Transaction);
    } catch (error) {
        console.error("Error al consultar transacciones: ", error);
        throw error;
    }
};