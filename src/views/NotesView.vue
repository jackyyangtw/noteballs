<template>
    <div class="notes">
        <Edit v-model="newNote" ref="editRef">
            <template #buttons>
                <button
                    class="button is-link has-background-success"
                    @click="addNote"
                    :disabled="newNote.length === 0"
                >
                    Add New Note
                </button>
            </template>
        </Edit>
        <Note
            v-for="note in notes"
            :key="note.id"
            :note="note"
            @deleteNote="deleteNote"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useNotesStore } from "@/stores/notes";
import { storeToRefs } from "pinia";
import Note from "@/components/Notes/Note.vue";
import Edit from "@/components/Notes/Edit.vue";
import { useWatchCharacters } from "@/use/useWatchCharacters";

const notesStore = useNotesStore();
const { notes } = storeToRefs(notesStore);
const { addNote: addNoteAction, deleteNote: deleteNoteAction } = notesStore;
const newNote = ref("");
const editRef = ref(null);

const addNote = () => {
    addNoteAction(newNote.value);
    newNote.value = "";
    editRef.value.focusInput();
};
const deleteNote = (id) => {
    deleteNoteAction(id);
};
useWatchCharacters(newNote);
</script>

