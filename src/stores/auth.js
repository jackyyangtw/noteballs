import { defineStore } from "pinia";
import { auth } from '../js/firebase.js'
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNotesStore } from "./notes.js";
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        initAuth() {
            const auth = getAuth();
            const { initNotes, clearNotes } = useNotesStore();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const { uid, email } = user;
                    this.user = {
                        uid,
                        email
                    }
                    initNotes();
                    this.router.push('/');
                } else {
                    this.user = null;
                    clearNotes();
                    this.router.replace('/auth');
                }
            });
        },
        async registerUser({ email, password }) {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password);
                const user = res.user;
                console.log('user', user);
            } catch (err) {
                console.log(err.message);
            }
        },
        async logoutUser() {
            try {
                await signOut(auth);
            } catch (err) {
                console.log(err.message);
            }
        },
        async loginUser({ email, password }) {
            try {
                const res = await signInWithEmailAndPassword(auth, email, password);
                const user = res.user;
                console.log('user', user);
            } catch (err) {
                console.log(err.message);
            }
        }
    },

})