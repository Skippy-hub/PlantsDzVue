<script setup lang="ts">
    import { useFavouriteStore } from '../stores/useFavouriteStore';
    import CardPlant from '../components/CardPlant.vue';
    import { computed, ref } from 'vue';

    const favouriteStore = useFavouriteStore();

    const isEmpty = computed(() => {
        if(favouriteStore.favourites.length == 0){
           return true; 
        } else{
            return false;
        }
    })
    
</script>

<template>
    <section class="cards" :class="{'empty': isEmpty}">
        <template v-if="favouriteStore.favourites.length">
            <CardPlant class="cards__card" v-for="card in favouriteStore.favourites" :key = "card.id"
            :image="card.image" :title="card.title" :price="card.price" :id="card.id"
            />
        </template>
        <template v-else>
            <p class="cards__text">Favourites are missing</p>
        </template>
    </section>
</template>

<style lang="scss">
    .cards{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;

        @media (max-width: 767px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 480px) {
            grid-template-columns: 1fr 1fr;
        }

        &__card{
            height: 100% !important;
        }

        &__text{
            text-align: center;
            font-size: 3rem;
            font-weight: 700;
        }
    }

    .empty{
        display: block;
    }
</style>