<script setup>
    import { cardsToCart } from '@/stores/cardsToCart';

    const cardToCart = cardsToCart();

    const props = defineProps({
        image: String,
        title: String,
        price: String,
        count: Number,
        id: Number
    });
</script>

<template>
    <div class="card">
        <div class="card__left">
            <img class="card__left-img" :src="props.image" alt="">
            <h3 class="card__left-title">{{ props.title }}</h3>
        </div>
        <p class="card__price">${{ props.price }}</p>
        <p class="card__count">{{ props.count }}</p>
        <p class="card__fullPrice">${{ (props.count * props.price).toFixed(2) }}</p>
        <svg @click="cardToCart.addToCart(props.id)" class="card__delete" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            margin-right: 7rem;
            max-width: 3.75rem;
            width: 100%;
        }

        &__count{
            color: #3d3d3d;
            font-size: 1rem;
            line-height: 100%;
            margin-right: 5.5rem;
            max-width: 2rem;
            width: 100%;
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
</style>