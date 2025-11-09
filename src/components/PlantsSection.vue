<script setup>
    import CardsPlants from './CardsPlants.vue';
    import { onMounted, ref } from 'vue';

    const minPrice = ref();
    const maxPrice = ref();

    const cards = ref([]);
    const result = ref();

    async function plants() {
        const response = await fetch('../../Plants.json');
        const data = await response.json();
        cards.value = data;
        result.value = cards.value;
    }
    
    onMounted(() => {
        plants();
    });
    
    function countPlant(value){
        let count = 0;
        for(let i = 0; i < cards.value.length; i++){
            if(cards.value[i].size == value){
                count++;
            }else if(value == "all"){
                return cards.value.length;
            }
        }
        return count;
    }

    const isActive = ref('all');

    function filterPlants(value){
        if(value == 'all'){
            isActive.value = value;
            result.value = cards.value;
        }else{
            isActive.value = value;
            result.value = cards.value.filter((card) => card.size == value);
        }
    }
</script>

<template>
    <section class="plants">
        <div class="plants__left">
            <div class="plants__left-filters">
                <h3 class="plants__left-filters-title">Size</h3>
                <div class="plants__left-filters-size">
                    <div @click="filterPlants('all')" :class="{'active': isActive == 'all'}" class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">All</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("all") }}</p>
                    </div>
                    <div @click="filterPlants('small')" :class="{'active': isActive == 'small'}" class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">Small</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("small") }}</p>
                    </div>
                    <div @click="filterPlants('medium')" :class="{'active': isActive == 'medium'}" class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">Medium</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("medium") }}</p>
                    </div>
                    <div @click="filterPlants('large')" :class="{'active': isActive == 'large'}" class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">Large</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("large") }}</p>
                    </div>
                </div>
                <form class="plants__left-filters-price" action="">
                    <div class="plants__left-filters-price-inputs">
                        <div class="plants__left-filters-price-inputs-block">
                            <label for="price1">Price from: </label>
                            <input v-model="minPrice" id="price1" class="plants__left-filters-price-inputs-block-input" placeholder="min" type="number">
                        </div>
                        <div class="plants__left-filters-price-inputs-block">
                            <label for="price2">Price to: </label>
                            <input v-model="maxPrice" id="price2" class="plants__left-filters-price-inputs-block-input" placeholder="max" type="number">
                        </div>
                    </div>
                </form>
            </div>
            <img class="plants__left-img" src="../assets/icons/SuperSaleBanner.png" alt="">
        </div>
        <div class="plants__cards">
            <template v-for="card in result" :key="card.id">
                <template v-if="(!minPrice || card.price >= minPrice) && (!maxPrice || card.price <= maxPrice)">
                    <CardsPlants
                    :key = "card.id"
                    :image="card.image" :title="card.title" :price="card.price" :id="card.id"
                    />
                </template>
            </template>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .plants{
        display: flex;
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
                        cursor: pointer;
                        padding: 0.25rem;
                        border-radius: 0.375rem;

                        &:hover{
                            background: #00f00050;
                        }

                        &.active{
                            background: #00f00050;
                        }
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

                        &-block{
                            display: flex;
                            gap: 1rem;
                            justify-content: space-between;

                            &-input{
                                -moz-appearance: textfield;
                                border: none;
                                border-bottom: 1px solid #000;

                                &::-webkit-inner-spin-button, ::-webkit-outer-spin-button{
                                    -webkit-appearance: none;
                                    margin: 0;
                                }

                                &::-ms-clear{
                                    display: none;
                                }

                                &:focus{
                                    outline: none;
                                }
                            }
                        }
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