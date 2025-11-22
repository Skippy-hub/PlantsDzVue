<script setup lang="ts">
    import { RouterLink } from 'vue-router';
</script>

<template>
    <section class="hero">
        <div class="hero__content">
            <h4 class="hero__content-subtitle">Welcome to GreenShop</h4>
            <h1 class="hero__content-title">Let’s Make a Better <span class="hero__content-title--green">Planet</span></h1>
            <p class="hero__content-text">We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!</p>
            <RouterLink to="/shop" class="hero__content-button">SHOP NOW</RouterLink>
        </div>
        <img class="hero__img" src="../assets/HeroImg.png" alt="">
    </section>
</template>

<style lang="scss" scoped>
    .hero{
        background: #F5F5F5;
        padding: 1.5rem 2.5rem;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        margin-bottom: 2rem;

        &__content{
            max-width: 34.8125rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.375rem;
            align-items: start;

            @media (max-width: 767px) {
                align-items: center;
                text-align: center;
            }

            &-subtitle{
                font-size: 0.875rem;
                line-height: 114%;
                color: #3d3d3d;
                text-transform: uppercase;
            }

            &-title{
                font-size: 4.375rem;
                line-height: 100%;
                font-weight: 800;
                text-transform: uppercase;

                &--green{
                    color: #46A358;
                    font-weight: 800;
                }

                @media (max-width: 767px) {
                    font-size: 3.5rem;
                }
            }

            &-text{
                color: #727272;
                font-size: 0.875rem;
                line-height: 171%;
                margin-bottom: 3.4375rem;

                @media (max-width: 767px) {
                    margin-bottom: 2.5rem;
                }
            }

            &-button{
                font-weight: 700;
                color: #fff;
                font-size: 1rem;
                line-height: 125%;
                padding: 0.625rem 1.625rem;
                border: transparent;
                background: #46A358;
                border-radius: 0.375rem;
                text-decoration: none;
            }
        }

        &__img{
            width: 100%;

            @media (max-width: 979px) {
                width: 50%;
            }

            @media (max-width: 767px) {
                display: none;
            }
        }
    }
</style>