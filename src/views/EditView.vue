<template>
    <div class="edit">
        <Edit
            bgColor="link"
            v-model="noteContent"
            ref="editRef"
            placeholder="Edit..."
        >
            <template #buttons>
                <button
                    class="button is-link is-light mr-2"
                    @click="$router.back()"
                >
                    Cancel
                </button>
                <button
                    class="button is-link"
                    :disabled="noteContent.length === 0"
                    @click="updateContent"
                >
                    Save Note
                </button>
            </template>
        </Edit>
    </div>
</template>

<script setup>
import Edit from "@/components/Notes/Edit.vue";
import { useNotesStore } from "@/stores/notes";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const notesStore = useNotesStore();
const { notes } = storeToRefs(notesStore);
const { updateNoteContent } = notesStore;
const route = useRoute();
const router = useRouter();

const noteContent = ref("");

const note = notes.value.find((a) => a.id === route.params.id);
noteContent.value = note.content;
const updateContent = () => {
    updateNoteContent(note.id, noteContent.value);
    router.push("/");
};
</script>
