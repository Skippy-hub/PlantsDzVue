<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { ref, onMounted, computed, watch } from 'vue';
    import { useFavouriteStore } from '../stores/useFavouriteStore';
    import { useCartStore } from '../stores/useCartStore';
    import { CardType } from '../types';

    const favouriteStore = useFavouriteStore();
    const cartStore = useCartStore();

    const route = useRoute();
    const id = route.params.id;

    const count = ref<number>(cardCount(+id) || 1);

    
    let card:CardType[];
    const cardData = ref<CardType>();

    card = cartStore.cards.filter((card:CardType) => card.id == +id);
    cardData.value = card[0];
    
    onMounted(() => {
        if (cartStore.cards.length) return;
        cartStore.getCards();
    });

    function decrement(){
        if(count.value > 1){
            count.value--;
            cartStore.changeCount(+id, count.value);
        }else{
            return count.value = 1;
        }
    }

    function increment(){
        if(count.value <= 0) return count.value = 1;
        count.value++;
        cartStore.changeCount(+id, count.value);
    }

    function favourite(){
        favouriteStore.addToFavourite(+id, cardData.value!.image, cardData.value!.title, cardData.value!.price);
    }

    function toCart(){
        cartStore.addToCart(+id, count.value, cardData.value!.title, cardData.value!.price, cardData.value!.image);
    }

    function display(){
        if(cartStore.isCardInCart(+id)){
            return "flex";
        } else{
            count.value = 1;
            return "none";
        }
    }

    function cardCount(id:number){
        const valueCard = cartStore.cardsCountArr.find((value) => value.id == id);
        return valueCard?.count;
    }

    watch(count, (newCount) => {
        if(count.value < 0) {
            return count.value = 1;
        }
        cartStore.changeCount(+id, newCount);
    });

    function Focus(){
        if(!count.value) return count.value = 1;
    }
</script>

<template>
    <section class="shopCard">
        <img class="shopCard__img" :src="cardData?.image" alt="">
        <div class="shopCard__specification">
            <div  class="shopCard__specification-header">
                <h1 class="shopCard__specification-header-title">{{ cardData?.title }}</h1>
                <p class="shopCard__specification-header-price">${{ cardData?.price }}</p>
            </div>
            <div class="shopCard__specification-descriptuon">
                <h4 class="shopCard__specification-description-title">Short description:</h4>
                <p class="shopCard__specification-description-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque adipisci eaque soluta quaerat a dolorem omnis aut, ipsa provident est. Quisquam, non nam. A cum commodi rerum quaerat vitae? Molestiae.</p>
                <p class="shopCard__specification-description-text"><span class="shopCard__specification-description-text-size">Size:</span> {{ cardData?.size }}</p>
            </div>
            <div class="shopCard__specification-cart">
                <div class="shopCard__specification-cart-count" :style="{display: `${display()}`}">
                    <button class="shopCard__specification-cart-count-button btn" @click="decrement()">&minus;</button>
                    <input class="shopCard__specification-cart-count-text" type="number" v-model="count" min="1" @blur="Focus()">
                    <button class="shopCard__specification-cart-count-button btn" @click="increment()">+</button>
                </div>
                <div class="shopCard__specification-cart-buttons">
                    <button class="shopCard__specification-cart-buttons-button btn">buy now</button>
                    <button @click="toCart" :class="{'cart': cartStore.isCardInCart(+id)}" class="shopCard__specification-cart-buttons-button btn">{{cartStore.isCardInCart(+id) ? "remove" : "add to cart"}}</button>
                    <button @click="favourite" class="shopCard__specification-cart-buttons-button btn btn--favourite">
                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path :class="{'favourite': favouriteStore.isFavouriteCard(+id)}" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                    2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                                    C13.09 3.81 14.76 3 16.5 3
                                    19.58 3 22 5.42 22 8.5
                                    c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    fill="none" stroke="#000" stroke-width="1.5"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="shopCard__specification-tags">
                <p class="shopCard__specification-tags-text"><span class="shopCard__specification-tags-text-bold">Category:</span> {{ cardData?.category }}</p>
                <p class="shopCard__specification-tags-text"><span class="shopCard__specification-tags-text-bold">Tags:</span> Home, Garden, Plants</p>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .btn{
        background: #46A358;
        border-radius: 0.1875rem;
        border: transparent;
        text-transform: uppercase;
        color: #fff;
        cursor: pointer;
    }

    .shopCard{
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: center;

        &__img{
            max-width: 30rem;
            width: 100%;
        }

        &__specification{
            max-width: 36rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;

            &-header{
                display: flex;
                flex-direction: column;
                gap: 21px;

                &-title{
                    font-size: 1.75rem;
                    line-height: 57%;
                    font-weight: 700;
                    color: #3d3d3d;
                }

                &-price{
                    font-size: 1.375rem;
                    line-height: 72%;
                    font-weight: 700;
                    color: #46A358;
                }
            }

            &-description{
                
                &-title{
                    font-size: 1rem;
                    color: #3d3d3d;
                    font-weight: 600;
                }

                &-text{
                    font-size: 0.875rem;
                    line-height: 171%;
                    color: #727272;

                    &-size{
                        font-weight: 600;
                        color: #3d3d3d;
                        font-size: 1rem;
                    }
                }
            }

            &-cart{
                display: flex;
                gap: 1.625rem;
                align-items: center;
                flex-wrap: wrap;
                
                &-count{
                    align-items: center;
                    max-width: 7.5rem;
                    width: 100%;
                    justify-content: space-between;

                    &-button{
                        font-size: 1.75rem;
                        line-height: 57%;
                        padding: 0.625rem;
                        border-radius: 2rem;
                        max-width: 2.25rem;
                        width: 100%;
                    }

                    &-text{
                        width: 30px;
                        border: none;
                        border-bottom: 1px solid #000;
                        text-align: center;
                        font-size: 0.90rem;
                        -moz-appearance: textfield;

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

                &-buttons{
                    display: flex;
                    gap: 0.625rem;
                    flex-wrap: wrap;
                    
                    &-button{
                        width: 8.125rem;                       
                        font-weight: 700;
                        font-size: 0.875rem;
                        line-height: 142%;
                        white-space: nowrap;
                        padding: 0.625rem 0;
                    }
                }
            }

            &-tags{
                display: flex;
                flex-direction: column;
                gap: 0.625rem;

                &-text{
                    font-size: 1rem;
                    color: #727272;

                    &-bold{
                        color: #acacac;
                    }
                }
            }
        }
    }

    .btn--favourite{
        max-width: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .favourite{
        fill: #f00;
        stroke: #f00;
    }

    .cart{
        color: #f00;
    }
</style>