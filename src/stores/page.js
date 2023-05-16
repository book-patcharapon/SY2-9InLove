import { defineStore } from 'pinia'
import { ref } from 'vue';
// import { useLocalStorage } from '@vueuse/core'

export const usePageStore = defineStore('page', () => {
  const page = ref(0);
    const closePage = ref(0);
    // const page = useLocalStorage('page', 0);
    // const closePage = useLocalStorage('page', 0)
  
    const setPage = (newPage) => {
      page.value = newPage;
      // storedPage.value = newPage;
    };
        const setClosePage = (newPage) => {
          closePage.value = newPage;
    };
    // const setClosePage = (newPage) => {
    //   closePage.value = newPage;
    //   // storedPage.value = newPage;
    // };
  
    // const getSetPage = () => {
    //   page.value = storedPage.value;
    // };
  
    return {
      page,
      closePage,
      setPage,
      // getSetPage,
      setClosePage
    };
  })