<script setup lang="ts">
    const props = defineProps({
        image: String,
        title: String,
        description: String,
    });
</script>

<template>
    <div class="card">
        <img class="card__img" :src="props.image" alt="">
        <h4 class="card__title">{{ props.title }}</h4>
        <p class="card__description">{{ props.description }}</p>
        <div class="card__back"></div>
    </div>
</template>

<style lang="scss" scoped>
    .card{
        max-width: 12.75rem;
        width: 100%;
        position: relative;

        &__img{
            margin-bottom: 1rem;
            margin-left: 1rem;
        }

        &__title{
            margin-bottom: 0.5rem;
            font-size: 1rem;
            line-height: 100%;
            font-weight: 700;
        }

        &__description{
            font-size: 0.875rem;
            line-height: 157%;
            color: #727272;
        }

        &__back{
            width: 4.625rem;
            height: 4.625rem;
            position: absolute;
            left: 0;
            top: 1.3125rem;
            background: #46A35813;
            border-radius: 50%;
        }
    }
</style>