<script setup lang="ts">
    import CardPlant from './CardPlant.vue';
    import { onMounted, ref, computed } from 'vue';
    import { CardType } from '../types';
    import { useCartStore } from '../stores/useCartStore';
    
    const cartStore = useCartStore();
    
    const result = ref<CardType[]>([]);
    
    const sortArr = computed(() => {
        result.value = cartStore.cards;
        if(cartStore.size == "all") return result.value;
        return result.value.filter((card) => card.size == cartStore.size);
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
                <h3 class="plants__left-filters-title">Size</h3>
                <div class="plants__left-filters-size">
                    <div @click="cartStore.size = 'all'" :class="{'active': cartStore.size == 'all'}" class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">All</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("all") }}</p>
                    </div>
                    <div @click="cartStore.size = 'small'" :class="{'active': cartStore.size == 'small'}" class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">Small</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("small") }}</p>
                    </div>
                    <div @click="cartStore.size = 'medium'" :class="{'active': cartStore.size == 'medium'}" class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">Medium</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("medium") }}</p>
                    </div>
                    <div @click="cartStore.size = 'large'" :class="{'active': cartStore.size == 'large'}" class="plants__left-filters-size-block">
                        <p class="plants__left-filters-size-text">Large</p>
                        <p class="plants__left-filters-size-text plants__left-filters-size-text--count">{{ countPlant("large") }}</p>
                    </div>
                </div>
                <form class="plants__left-filters-price" action="">
                    <div class="plants__left-filters-price-inputs">
                        <div class="plants__left-filters-price-inputs-block">
                            <label for="price1">Price from: </label>
                            <input v-model="cartStore.minPrice" id="price1" class="plants__left-filters-price-inputs-block-input" placeholder="min" type="number">
                        </div>
                        <div class="plants__left-filters-price-inputs-block">
                            <label for="price2">Price to: </label>
                            <input v-model="cartStore.maxPrice" id="price2" class="plants__left-filters-price-inputs-block-input" placeholder="max" type="number">
                        </div>
                    </div>
                </form>
            </div>
            <img class="plants__left-img" src="../assets/SuperSaleBanner.png" alt="">
        </div>
        <div class="plants__cards">
            <template v-for="card in sortArr" :key="card.id">
                <template v-if="(!cartStore.minPrice || card.price >= cartStore.minPrice) && (!cartStore.maxPrice || card.price <= cartStore.maxPrice)">
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