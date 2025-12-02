import { defineStore } from 'pinia';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

export const useFilterStore = defineStore('filter', () => {

    const minPrice = ref<string>();
    const maxPrice = ref<string>();
    const size = ref<string>('all');
    const category = ref<string>('all');

    const { currentRoute, push, replace } = useRouter();

    // const firstFilter = ref<string>();

    // const saveUserNameToQuery = (parameter: string, name: string) => {
    //     firstFilter.value = parameter;
    //     push({
    //         query: {
    //         [parameter]: name,
    //         },
    //     });
    // }

    // const updateQueryState = (parameter: string, value: string) => {
    //     replace({
    //         query: {
    //         ...currentRoute.value.query,
    //         [parameter]: value,
    //         },
    //     });
    // }

    // const resetQuery = () => {
    //     push({
    //         query: {},
    //     });
    // }

    onMounted(() => {
        const query = currentRoute.value.query;
        if (query.category) {
            category.value = query.category as string;
        }
        if (query.size) {
            size.value = query.size as string;
        }
        if (query.minPrice) {
            minPrice.value = query.minPrice as string;
        }
        if (query.maxPrice) {
            maxPrice.value = query.maxPrice as string;
        }
    });

    watch([() => size.value, () => category.value, () => minPrice.value, () => maxPrice.value], ([newSize, newCategory, newMinPrice, newMaxPrice]) => {
        const newQuery: Record<string, string | undefined> = {};

        if (newCategory !== "all") {
            newQuery.category = newCategory;
        }
        if (newSize !== "all") {
            newQuery.size = newSize;
        }

        if (newMinPrice !== undefined && newMinPrice !== null && newMinPrice !== "") {
            newQuery.minPrice = newMinPrice;
        }

        if (newMaxPrice !== undefined && newMaxPrice !== null && newMaxPrice !== "") {
            newQuery.maxPrice = newMaxPrice;
        }
        // Используем replace, чтобы избежать лишних записей в истории браузера при изменении фильтров
        // Если вам нужна история, используйте push
        replace({ query: newQuery });
    });

    return{
        // saveUserNameToQuery,
        // updateQueryState,
        // resetQuery,
        minPrice,
        maxPrice,
        size,
        category,
        // firstFilter,
    }
});