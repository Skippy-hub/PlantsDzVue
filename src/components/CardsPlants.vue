<script setup>
    import { RouterLink } from 'vue-router';
    const props = defineProps({
        id: String,
        image: String,
        title: String,
        price: String,
    });
</script>

<template>
    <RouterLink :to="`/shop/${props.id}`" class="card">
        <img class="card__img" :src="props.image" alt="">
        <h5 class="card__title">{{ props.title }}</h5>
        <p class="card__price">${{ props.price }}</p>
    </RouterLink>
</template>

<style lang="scss" scoped>
    .card{
        text-decoration: none;
        color: #000;
        height: 18.75rem;

        &__img{
            width: 100%;
        }

        &__price{
            color: #46A358;
            font-weight: 700;
        }
    }
</style>