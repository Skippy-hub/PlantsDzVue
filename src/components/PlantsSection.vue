<script setup>
    import CardsPlants from './CardsPlants.vue';
    import img1 from '../assets/icons/plant1.png';
    import img2 from '../assets/icons/plant2.png';
    import img3 from '../assets/icons/plant3.png';
    import { ref } from 'vue';

    const minPrice = ref();
    const maxPrice = ref();

    const cards = [
        {
            id: 1,
            image: img1,
            title: 'Barberton Daisy',
            price: '119.00',
            size: 'large',
        },
        {
            id: 2,
            image: img2,
            title: 'Angel Wing Begonia',
            price: '169.00',
            size: 'medium',
        },
        {
            id: 3,
            image: img3,
            title: 'African Violet',
            price: '199.00',
            size: 'small',
        },
        {
            id: 4,
            image: img1,
            title: 'Barberton Daisy',
            price: '119.00',
            size: 'large',
        },
        {
            id: 5,
            image: img2,
            title: 'Angel Wing Begonia',
            price: '169.00',
            size: 'medium',
        },
        {
            id: 6,
            image: img3,
            title: 'African Violet',
            price: '199.00',
            size: 'small',
        },
        {
            id: 7,
            image: img1,
            title: 'Barberton Daisy',
            price: '119.00',
            size: 'large',
        },
        {
            id: 8,
            image: img2,
            title: 'Angel Wing Begonia',
            price: '169.00',
            size: 'medium',
        },
        {
            id: 9,
            image: img3,
            title: 'African Violet',
            price: '199.00',
            size: 'small',
        },
    ];

    function countPlant(value){
        let count = 0;
        for(let i = 0; i < cards.length; i++){
            if(cards[i].size == value){
                count++;
            }
        }
        return count;
    }
</script>

<template>
    <section class="plants">
        <div class="plants__left">
            <div class="plants__left-filters">
                <h3 class="plants__left-filters-title">Size</h3>
                <div class="plants__left-filters-size">
                    <div class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">Small</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("small") }}</p>
                    </div>
                    <div class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">Medium</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("medium") }}</p>
                    </div>
                    <div class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">Large</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("large") }}</p>
                    </div>
                </div>
                <form class="plants__left-filters-price" action="">
                    <div class="plants__left-filters-price-inputs">
                        <div>
                            <label for="price1">Цена от: </label>
                            <input v-model="minPrice" id="price1" class="plants__left-filters-price-inputs-input" placeholder="минимум" type="number">
                        </div>
                        <div>
                            <label for="price2">Цена до: </label>
                            <input v-model="maxPrice" id="price2" class="plants__left-filters-price--inputs-input" placeholder="максимум" type="number">
                        </div>
                    </div>
                    <!-- <button @click.prevent="filter" class="plants__left-filters-price-button">Filter</button> -->
                </form>
            </div>
            <img class="plants__left-img" src="../assets/icons/SuperSaleBanner.png" alt="">
        </div>
        <div class="plants__cards">
            <template v-for="card in cards" :key="card.id">
                <template v-if="minPrice || maxPrice">
                    <!-- <CardsPlants
                    v-if="(card.price >= minPrice && card.price <= maxPrice) || (card.price >= minPrice && maxPrice == undefined) || (card.price <= maxPrice && minPrice == undefined)"
                    :image="card.image" :title="card.title" :price="card.price"
                    /> -->
                    <!-- <CardsPlants
                    v-if="(card.price >= minPrice && card.price <= maxPrice)"
                    :image="card.image" :title="card.title" :price="card.price"
                    /> -->

                    <CardsPlants
                        v-if="(!minPrice || card.price >= minPrice) && (!maxPrice || card.price <= maxPrice)"
                        :image="card.image" :title="card.title" :price="card.price"
                    />
                </template>
                <template v-else>
                    <CardsPlants
                        :image="card.image" :title="card.title" :price="card.price"
                    />
                </template>
            </template>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .plants{
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 2rem;

        @media (max-width: 979px) {
            justify-content: space-around;
        }

        @media (max-width: 767px) {
            flex-direction: column;
            align-items: center;
        }

        &__left{
            max-width: 19.375rem;
            width: 100%;

            &-filters{
                padding: 0 1.125rem;
                margin-bottom: 2rem;

                &-title{
                    font-size: 1.125rem;
                    line-height: 89%;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                &-size{
                    padding: 0 1.875rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 1rem;

                    &-block{
                        display: flex;
                        justify-content: space-between;
                        gap: 1rem;
                    }

                    &-text{
                        font-size: 1rem;
                        line-height: 100%;
                        color: #3d3d3d;
                    }
                }

                &-price{
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    align-items: start;

                    &-inputs{
                        display: flex;
                        flex-direction: column;
                        gap: 0.25rem;
                    }

                    &-button{
                        padding: 0.5rem 1.5rem;
                        font-size: 1rem;
                        font-weight: 700;
                        color: #fff;
                        background: #46A358;
                        border-radius: 0.375rem;
                        border: transparent;
                    }
                }
            }

            &-img{
                width: 100%;

                @media (max-width: 767px) {
                    display: none;
                }
            }
        }

        &__cards{
            display: grid;
            grid-template-columns: repeat(3, auto);
            gap: 3rem;

            @media (max-width: 1200px) {
                grid-template-columns: auto auto;
            }

            @media (max-width: 979px) {
                grid-template-columns: auto;
            }
        }
    }
</style>