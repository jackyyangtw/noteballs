<template>
    <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark`">
        <label v-if="label" class="label has-text-white">{{ label }}</label>
        <div class="field">
            <div class="control">
                <textarea
                    class="textarea"
                    maxlength="100"
                    ref="newNoteInput"
                    :placeholder="placeholder"
                    :value="modelValue"
                    @input="$emit('update:modelValue', $event.target.value)"
                    v-autofocus
                ></textarea>
            </div>
        </div>
        <div class="field is-grouped is-grouped-right">
            <div class="control">
                <slot name="buttons" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { vAutofocus } from "@/directives/vAutofocus";
defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    bgColor: {
        type: String,
        default: "success",
    },
    placeholder: {
        type: String,
        default: "Add a new note...",
    },
    label: {
        type: String,
        default: "New Note",
    },
});
defineEmits(["update:modelValue"]);

const newNoteInput = ref(null);
const focusInput = () => {
    newNoteInput.value.focus();
};
defineExpose({ focusInput });
</script>
