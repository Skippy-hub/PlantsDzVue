import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFilterStore = defineStore('filter', () => {

    const minPrice = ref<string>();
    const maxPrice = ref<string>();
    const size = ref<string>('all');
    const category = ref<string>('all');

    return{
        minPrice,
        maxPrice,
        size,
        category,
    }
});