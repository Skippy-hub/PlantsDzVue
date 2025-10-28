<script setup>
    const props = defineProps({
        image: String,
        title: String,
        price: String,
    });
</script>

<template>
    <div class="card">
        <img class="card__img" :src="props.image" alt="">
        <h5 class="card__title">{{ props.title }}</h5>
        <p class="card__price">${{ props.price }}</p>
    </div>
</template>

<style lang="scss" scoped>
    .card{
        &__img{
            width: 100%;

            @media (max-width: 1200px) {
                width: 50%;
            }

            @media (max-width: 979px) {
                width: 100%;
            }
        }

        &__price{
            color: #46A358;
            font-weight: 700;
        }
    }
</style>