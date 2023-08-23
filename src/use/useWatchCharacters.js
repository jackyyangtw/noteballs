import { watch } from "vue";
export const useWatchCharacters = (valueToWatch, maxCount = 100) => {
    watch(valueToWatch, (newVal) => {
        if (newVal.length >= maxCount) {
            alert(
                `You have reached the maximum number (${maxCount}) of characters allowed for a note!`
            );
        }
    });
}