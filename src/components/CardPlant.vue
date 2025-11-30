<script setup lang="ts">
    import { RouterLink, useRouter } from 'vue-router';
    import { useCartStore } from '../stores/useCartStore';
    import { useFavouriteStore } from '../stores/useFavouriteStore';
    import { useAutorisation } from '../stores/useAutorisation';
    
    const cartStore = useCartStore();
    const favouriteStore = useFavouriteStore();
    const Autoris = useAutorisation();
    const router = useRouter();

    interface Props {
        id: number;
        image: string;
        title: string;
        price: string;
    }

    const props = defineProps<Props>();

    function toFavourites(){
        if(!Autoris.isAuthenticated) return router.push('/autorisation/sign-in');
        favouriteStore.addToFavourite(props.id, props.image, props.title, props.price);
    }
</script>

<template>
    <RouterLink :to="`/shop/${props.id}`" class="card">
        <img class="card__img" :src="props.image" alt="">
        <h5 class="card__title" :class="{'cart': cartStore.isCardInCart(props.id!)}">{{ props.title }}</h5>
        <p class="card__price" :class="{'cart': cartStore.isCardInCart(props.id!)}">${{ props.price }}</p>
        <button class="card__button" :class="{'visibility': favouriteStore.isFavouriteCard(props.id)}" @click.prevent="toFavourites">
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path :class="{'active': favouriteStore.isFavouriteCard(props.id!)}" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                        2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                        C13.09 3.81 14.76 3 16.5 3
                        19.58 3 22 5.42 22 8.5
                        c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="none" stroke="#000" stroke-width="1.5"/>
            </svg>
        </button>
    </RouterLink>
</template>

<style lang="scss" scoped>
    .card{
        text-decoration: none;
        color: #000;
        height: 18.75rem;
        position: relative;

        &__img{
            max-width: 15.625rem;
            width: 100%;
        }

        &__price{
            color: #46A358;
            font-weight: 700;
        }

        &__button{
            position: absolute;
            top: 1rem;
            right: 1rem;
            display: none;
            align-items: center;
            justify-content: center;
            background: transparent;
            padding: 0.25rem;
            border-radius: 0.25rem;
            cursor: pointer;
        }

        &:hover{
            .card__button{
                display: flex;
            }
        }
    }

    .cart{
        color: #1d05f1;
    }

    .active{
        fill: #f00;
        stroke: #f00;

        .card__button{
            display: flex;
        }
    }

    .visibility{
        display: flex;
    }
</style>