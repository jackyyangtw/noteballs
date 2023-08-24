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
        <progress
            v-if="!notesLoaded"
            class="progress is-large is-success"
            max="100"
        >
            60%
        </progress>
        <template v-else>
            <Note
                v-for="note in notes"
                :key="note.id"
                :note="note"
                @deleteNote="deleteNote"
            />
        </template>
        <div
            class="is-size-4 has-text-centered"
            v-if="notes.length === 0 && notesLoaded"
        >
            No notes here yet...
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useNotesStore } from "@/stores/notes";
import { storeToRefs } from "pinia";
import { useWatchCharacters } from "@/use/useWatchCharacters";
import Note from "@/components/Notes/Note.vue";
import Edit from "@/components/Notes/Edit.vue";

const notesStore = useNotesStore();
const { notes, notesLoaded } = storeToRefs(notesStore);
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

