import { db } from "@/services/firebase/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Category, defaultCategories } from "./Category";

const ADMIN_CATEGORIES = 'adminCategories';
const USER_CATEGORIES = 'categories';

export const initializeUserCategories = async (userId: string) => {
    const userCategoriesRef = collection(db, 'users',userId, USER_CATEGORIES);
    const snapshot = await getDocs(userCategoriesRef);
    if(snapshot.empty) {
        const adminCategoriesRef = collection(db, ADMIN_CATEGORIES);
        const adminSnapshot = await getDocs(adminCategoriesRef);

        const promises = adminSnapshot.docs.map(doc => {
            const categoryData =doc.data() as Category;
            return addDoc(userCategoriesRef, categoryData);
        });
        await Promise.all(promises);
    }
};

export const insertAdminCategories = async() => {
    const adminCategoriesRef = collection(db, ADMIN_CATEGORIES);
    const promises = defaultCategories.map(category => addDoc(adminCategoriesRef, category));
    await Promise.all(promises);
};