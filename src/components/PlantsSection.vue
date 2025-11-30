<script setup lang="ts">
    import CardPlant from './CardPlant.vue';
    import { onMounted, ref, computed } from 'vue';
    import { CardType } from '../types';
    import { useCartStore } from '../stores/useCartStore';
    import { useFilterStore } from '../stores/useFilterStore';
    
    const cartStore = useCartStore();
    const filterStore = useFilterStore();
    
    const result = ref<CardType[]>([]);
    
    const sortArr = computed(() => {
        result.value = cartStore.cards;
        if(filterStore.size == "all" && filterStore.category == 'all'){
            return result.value;
        } else if(filterStore.size == 'all' && filterStore.category != 'all'){
            return result.value.filter((card) => card.category == filterStore.category);
        } else if(filterStore.size != 'all' && filterStore.category == 'all'){
            return result.value.filter((card) => card.size == filterStore.size);
        } else{
            return result.value.filter((card) => card.category == filterStore.category && card.size == filterStore.size);
        }
    });
    
    onMounted(() => {
        if (cartStore.cards.length) return;
        cartStore.getCards();
    });
    
    function countPlant(value:string){
        let count = 0;
        if(cartStore.cards){
            for(let i = 0; i < (cartStore.cards.length); i++){
                if(cartStore.cards[i].size == value){
                    count++;
                }else if(value == "all"){
                    return cartStore.cards.length;
                }
            }
        }
        return count;
    }

</script>

<template>
    <section class="plants">
        <div class="plants__left">
            <div class="plants__left-filters">
                <h3 class="plants__left-filters-title">Category</h3>
                <div class="plants__left-filters-category">
                    <p @click="filterStore.category = 'all'" class="plants__left-filters-category-text" :class="{'active': filterStore.category == 'all'}">All</p>
                    <p @click="filterStore.category = 'Outdoor Plants'" :class="{'active': filterStore.category == 'Outdoor Plants'}" class="plants__left-filters-category-text">Outdoor Plants</p>
                    <p @click="filterStore.category = 'Flowerpot on a stand'" :class="{'active': filterStore.category == 'Flowerpot on a stand'}" class="plants__left-filters-category-text">Flowerpot on a stand</p>
                    <p @click="filterStore.category = 'Potter Plants'" :class="{'active': filterStore.category == 'Potter Plants'}" class="plants__left-filters-category-text">Potter Plants</p>
                    <p @click="filterStore.category = 'Hanging Plants'" :class="{'active': filterStore.category == 'Hanging Plants'}" class="plants__left-filters-category-text">Hanging Plants</p>
                </div>
                <h3 class="plants__left-filters-title">Size</h3>
                <div class="plants__left-filters-size">
                    <div @click="filterStore.size = 'all'" :class="{'active': filterStore.size == 'all'}" class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">All</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("all") }}</p>
                    </div>
                    <div @click="filterStore.size = 'small'" :class="{'active': filterStore.size == 'small'}" class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">Small</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("small") }}</p>
                    </div>
                    <div @click="filterStore.size = 'medium'" :class="{'active': filterStore.size == 'medium'}" class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">Medium</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("medium") }}</p>
                    </div>
                    <div @click="filterStore.size = 'large'" :class="{'active': filterStore.size == 'large'}" class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">Large</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("large") }}</p>
                    </div>
                </div>
                <form class="plants__left-filters-price" action="">
                    <div class="plants__left-filters-price-inputs">
                        <div class="plants__left-filters-price-inputs-block">
                            <label for="price1">Price from: </label>
                            <input v-model="filterStore.minPrice" id="price1" class="plants__left-filters-price-inputs-block-input" placeholder="min" type="number">
                        </div>
                        <div class="plants__left-filters-price-inputs-block">
                            <label for="price2">Price to: </label>
                            <input v-model="filterStore.maxPrice" id="price2" class="plants__left-filters-price-inputs-block-input" placeholder="max" type="number">
                        </div>
                    </div>
                </form>
            </div>
            <img class="plants__left-img" src="../assets/SuperSaleBanner.png" alt="">
        </div>
        <div class="plants__cards">
            <template v-for="card in sortArr" :key="card.id">
                <template v-if="(!filterStore.minPrice || card.price >= filterStore.minPrice) && (!filterStore.maxPrice || card.price <= filterStore.maxPrice)">
                    <CardPlant
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

                &-category{
                    padding: 0 1.875rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 1rem;

                    &-text{
                        padding: 0.25rem 0;
                        font-size: 1rem;
                        line-height: 100%;
                        color: #3d3d3d;
                        border-radius: 0.375rem;
                        cursor: pointer;

                        &:hover{
                            background: #00f00050;
                        }
                    }
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
            grid-auto-rows: 18.75rem;
            gap: 3rem;

            @media (max-width: 1200px) {
                grid-template-columns: auto auto;
            }

            @media (max-width: 979px) {
                grid-template-columns: auto;
            }
        }
    }

    .active{
        background: #00f00050;
    }
</style>