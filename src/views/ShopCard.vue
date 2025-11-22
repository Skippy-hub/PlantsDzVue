<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';
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

    
    async function plants() {
        const response = await fetch('../../Plants.json');
        const data = await response.json();
        card = data.filter((card:CardType) => card.id == +id);
        cardData.value = card[0];
    }
    
    onMounted(() => {
        plants();
    });

    function decrement(){
        if(count.value > 1){
            count.value--;
            cartStore.changeCount(+id, count.value);
        }else{
            return;
        }
    }

    function increment(){
        count.value++;
        cartStore.changeCount(+id, count.value);
    }

    function favourite(){
        favouriteStore.addToFavourite(+id);
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
                    <button class="shopCard__specification-cart-count-button btn padding" @click="decrement()">-</button>
                    <p class="shopCard__specification-cart-count-text">{{ cardCount(+id) }}</p>
                    <button class="shopCard__specification-cart-count-button btn" @click="increment()">+</button>
                </div>
                <div class="shopCard__specification-cart-buttons">
                    <button class="shopCard__specification-cart-buttons-button btn">buy now</button>
                    <button @click="toCart" :class="{'cart': cartStore.isCardInCart(+id)}" class="shopCard__specification-cart-buttons-button btn">{{cartStore.isCardInCart(+id) ? "remove" : "add to cart"}}</button>
                    <button @click="favourite" :class="{'favourite': favouriteStore.isFavouriteCard(+id)}" class="shopCard__specification-cart-buttons-button btn">favourites</button>
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

    .favourite{
        color: #f00;
    }

    .cart{
        color: #f00;
    }

    .padding{
        padding: 7px 10px 13px;
    }
</style>