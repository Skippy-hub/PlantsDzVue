<script setup lang="ts">
    import { cardsToCart } from '../stores/cardsToCart';
    import { ref } from 'vue';

    const cardToCart = cardsToCart();

    const props = defineProps({
        image: String,
        title: String,
        price: String,
        count: Number,
        id: Number,
        total: Number,
    });

    const count = ref<number>(props.count || 0);

    function decrement(){
        if(count.value > 1){
            count.value--;
            cardToCart.changeCount(props.id || 0, count.value);
        }else{
            return;
        }
    }

    function increment(){
        count.value++;
        cardToCart.changeCount(props.id || 0, count.value);
    }
</script>

<template>
    <div class="card">
        <div class="card__left">
            <img class="card__left-img" :src="props.image" alt="">
            <h3 class="card__left-title">{{ props.title }}</h3>
        </div>
        <p class="card__price">${{ props.price }}</p>
        <div class="card__count">
            <button @click="decrement()" class="card__count-button btn padding">-</button>
            <p class="card__count-text">{{ props.count }}</p>
            <button @click="increment()" class="card__count-button btn">+</button>
        </div>
        <p class="card__fullPrice">${{ (props.total || 0).toFixed(2) }}</p>
        <svg @click="cardToCart.removeToCart(props.id || 0)" class="card__delete" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Iconly/Curved/Delete">
                <g id="Delete">
                    <path id="Stroke 1" d="M18.8892 9.55408C18.8892 17.5731 20.0435 21.1979 12.2797 21.1979C4.5149 21.1979 5.693 17.5731 5.693 9.55408" stroke="#727272" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Stroke 3" d="M20.3651 6.47979H4.2146" stroke="#727272" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path id="Stroke 5" d="M15.7148 6.47979C15.7148 6.47979 16.2434 2.71408 12.2891 2.71408C8.33578 2.71408 8.86435 6.47979 8.86435 6.47979" stroke="#727272" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </g>
        </svg>
    </div>
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

    .card{
        display: flex;
        align-items: center;
        text-align: center;
        margin-bottom: 0.5rem;

        &__left{
            display: flex;
            align-items: center;
            max-width: 15rem;
            width: 100%;
            margin-right: 3.5rem;

            &-img{
                width: 4.375rem;
                height: 4.375rem;
            }

            &-title{
                font-weight: 700;
                font-size: 1rem;
                line-height: 100%;
                color: #3d3d3d;
            }
        }

        &__price{
            color: #727272;
            font-size: 1rem;
            line-height: 100%;
            margin-right: 5rem;
            max-width: 3.75rem;
            width: 100%;
        }

        &__count{
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-right: 2.5rem;
            max-width: 7.125rem;
            width: 100%;
            
            &-text{
                color: #3d3d3d;
                font-size: 1rem;
                line-height: 100%;
            }

            &-button{
                font-size: 1.75rem;
                line-height: 57%;
                padding: 0.625rem;
                border-radius: 2rem;
                max-width: 2.25rem;
                width: 100%;

            }
        }
        
        &__fullPrice{
            max-width: 5rem;
            width: 100%;
            color: #46A358;
            font-size: 1rem;
            line-height: 100%;
            font-weight: 700;
            margin-right: 3rem;
        }

        &__delete{
            max-width: 2rem;
            width: 100%;
            cursor: pointer;
        }
    }
    
    .padding{
        padding: 7px 10px 13px;
    }
</style>