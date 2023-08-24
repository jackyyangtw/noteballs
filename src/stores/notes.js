import { defineStore } from "pinia";
import { db } from "../js/firebase";
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy, addDoc } from "firebase/firestore";
import { useAuthStore } from "./auth";


let notesCollectionRef;

// https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=zh-tw#order_and_limit_data
let notesCollectionQuery;

let getNotesSnapshot = null;

export const useNotesStore = defineStore("notes", {
    state: () => ({
        notes: [],
        notesLoaded: false,
    }),
    getters: {
        totalNotesCount() {
            return this.notes.length;
        },
        totalCharactersCount() {
            return this.notes.reduce((acc, note) => acc + note.content.length, 0);
        }
    },
    actions: {
        initNotes() {
            const authStore = useAuthStore();
            const { user } = authStore;
            notesCollectionRef = collection(db, "users", user.uid, "notes");
            // https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=zh-tw#order_and_limit_data
            notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
            this.getNotes();
        },
        unsuscribe() {
            // unsubscribe to the previous listener
            if (getNotesSnapshot) {
                getNotesSnapshot();
            }
        },
        clearNotes() {
            this.notes = [];
            this.unsuscribe();
        },
        async getNotes() {
            this.notesLoaded = false;
            // 及時監聽firebase資料庫的變化
            // https://firebase.google.com/docs/firestore/query-data/listen?hl=zh-tw#listen_to_multiple_documents_in_a_collection
            getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
                let notes = [];
                querySnapshot.forEach((doc) => {
                    notes.push({
                        id: doc.id,
                        content: doc.data().content,
                        date: doc.data().date,
                    })
                });
                this.notes = notes;
                this.notesLoaded = true;
            }, error => {
                console.log(error.message);
            });
        },
        async addNote(content) {
            const date = JSON.stringify(new Date().getTime());

            // auto generate id
            // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=zh-tw#add_a_document
            await addDoc(notesCollectionRef, {
                content,
                date,
            });
        },
        async deleteNote(id) {
            // https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=zh-tw
            await deleteDoc(doc(notesCollectionRef, id));
        },
        async updateNoteContent(id, content) {
            // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=zh-tw#update-data
            await updateDoc(doc(notesCollectionRef, id), {
                content,
            });
        },
    },
});