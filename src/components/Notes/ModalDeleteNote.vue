<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card" ref="modalCardRef">
            <header class="modal-card-head">
                <p class="modal-card-title">Delete Note ?</p>
                <button
                    @click="closeModal"
                    class="delete"
                    aria-label="close"
                ></button>
            </header>
            <section class="modal-card-body">
                Are you sure you want to delete this note ?
            </section>
            <footer class="modal-card-foot is-justify-content-flex-end">
                <button class="button" @click="closeModal">Cancel</button>
                <button class="button is-danger" @click="deleteNote(note.id)">
                    Delete
                </button>
            </footer>
        </div>
    </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { onMounted, onUnmounted, ref } from "vue";
import { useNotesStore } from "../../stores/notes";
const notesStore = useNotesStore();
const { deleteNote } = notesStore;
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    note: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(["update:modelValue"]);
const closeModal = () => {
    emit("update:modelValue", false);
};

// click outside the modal to close it
const modalCardRef = ref(null);
onClickOutside(modalCardRef, closeModal);

// keyboard control
const handleKeydown = (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
};
onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
});
</script>
