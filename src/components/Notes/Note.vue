<template>
    <div class="card mb-4">
        <div class="card-content">
            <div class="content">{{ note.content }}</div>
            <div class="has-text-right has-text-grey-light mt-2">
                <small>{{ chatactersLength }} characters</small>
            </div>
        </div>
        <footer class="card-footer">
            <RouterLink :to="`/edit/${note.id}`" class="card-footer-item"
                >Edit</RouterLink
            >
            <a
                href="#"
                class="card-footer-item"
                @click="modal.deleteNote = true"
                >Delete</a
            >
        </footer>
        <ModalDeleteNote
            v-if="modal.deleteNote"
            v-model="modal.deleteNote"
            :note="note"
        ></ModalDeleteNote>
    </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import ModalDeleteNote from "./ModalDeleteNote.vue";
const props = defineProps({
    note: {
        type: Object,
        required: true,
    },
});
const emit = defineEmits(["deleteNote"]);
const chatactersLength = computed(() => {
    return props.note.content.length;
});
const deleteNote = () => {
    emit("deleteNote", props.note.id);
};
const modal = reactive({
    deleteNote: false,
});
</script>

