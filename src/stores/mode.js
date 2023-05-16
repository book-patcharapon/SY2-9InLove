import { defineStore } from 'pinia'
// import { useLocalStorage } from '@vueuse/core'
import { ref } from 'vue';
export const useModeStore = defineStore('mode', () => {
    const ActiveCloseBut = ref(false)

    const setMode = (mode) => {
        ActiveCloseBut.value = mode;
    };

    return {
        ActiveCloseBut,
        setMode
    }
  })