<template>
    <div class="stats">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Number of Notes</td>
                    <td>{{ totalNotesCount }}</td>
                </tr>
                <tr>
                    <td>Number of Character (of all notes)</td>
                    <td>{{ totalCharactersCount }}</td>
                </tr>
            </tbody>
        </table>
        <input
            type="text"
            class="input"
            placeholder="Do you love Noteballs?"
            v-autofocus
            v-model="inputValue"
            :maxlength="maxInputCount"
        />
    </div>
</template>


<script setup>
import { storeToRefs } from "pinia";
import { useNotesStore } from "../stores/notes";
import { vAutofocus } from "../directives/vAutofocus";
import { useWatchCharacters } from "../use/useWatchCharacters";
import { ref } from "vue";
const notesStore = useNotesStore();
const { totalNotesCount, totalCharactersCount } = storeToRefs(notesStore);
const maxInputCount = 10;

const inputValue = ref("");
useWatchCharacters(inputValue, maxInputCount);
</script>

