import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (error) {
        console.error('Error durante el login de Google: ', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Error durante el logout: ', error);
        throw error;
    }
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('user');
};