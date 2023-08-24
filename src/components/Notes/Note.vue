<template>
    <div class="card mb-4">
        <div class="card-content">
            <div class="content">{{ note.content }}</div>
            <div class="columns is-mobile has-text-grey-light mt-2">
                <small class="column">{{ dateFormat }}</small>
                <small class="column has-text-right"
                    >{{ chatactersLength }} characters</small
                >
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
import { useDateFormat } from "@vueuse/core";

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

const date = new Date(parseInt(props.note.date));
const dateFormat = useDateFormat(date, "YYYY-MM-DD HH:mm:ss");
</script>

