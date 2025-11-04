<script setup>
    import { ref, onMounted } from 'vue';
    import CardsPlants from '@/components/CardsPlants.vue';


    const cards = ref([]);

    async function plants() {
        const response = await fetch('../../public/Plants.json');
        const data = await response.json();
        cards.value = data;
    }

    onMounted(() => {
        plants();
    });
</script>

<template>
    <div class="cards">
        <CardsPlants
            v-for="card in cards" :key="card.id"
            :image="card.image" :title="card.title" :price="card.price" :id="card.id"
        />
    </div>
</template>

<style lang="scss" scoped>
    .cards{
        display: grid;
        grid-template-columns: repeat(4, auto);
        gap: 3rem;

        @media (max-width: 979px) {
            grid-template-columns: repeat(3, auto);
        }

        @media (max-width: 767px) {
            grid-template-columns: repeat(2, auto);
        }

        @media (max-width: 480px) {
            grid-template-columns: 60%;
            justify-content: center;
        }
    }
</style>