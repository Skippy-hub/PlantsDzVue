<script setup lang="ts">
    import { onMounted, computed } from 'vue';
    import CardPlant from '../components/CardPlant.vue';
    import { useCartStore } from '../stores/useCartStore';
    import { useFilterStore } from '../stores/useFilterStore';


    const cartStore = useCartStore();
    const filterStore = useFilterStore();

    onMounted(() => {
        if (cartStore.cards.length) return;
        cartStore.getCards();
    });

    const filterSize = computed(() => {
        if(filterStore.size == 'all' && filterStore.category == 'all'){
            return cartStore.cards;
        } else if(filterStore.size == 'all' && filterStore.category != 'all'){
            return cartStore.cards.filter((card) => card.category == filterStore.category);
        } else if(filterStore.size != 'all' && filterStore.category == 'all'){
            return cartStore.cards.filter((card) => card.size == filterStore.size);
        } else{
            return cartStore.cards.filter((card) => card.category == filterStore.category && card.size == filterStore.size);
        }
    });
</script>

<template>
    <section class="shop">
        <div class="shop__filters">
            <div class="shop__filters-size">
                <label class="shop__filters-size-text" for="size">Size: </label>
                <select class="shop__filters-size-select" v-model="filterStore.size" name="size" id="size">
                    <option class="shop__filters-size-select-value" value="all">All</option>
                    <option class="shop__filters-size-select-value" value="small">Small</option>
                    <option class="shop__filters-size-select-value" value="medium">Medium</option>
                    <option class="shop__filters-size-select-value" value="large">Large</option>
                </select>
            </div>
            <div class="shop__filters-category">
                <label class="shop__filters-category-text" for="category">Category: </label>
                <select class="shop__filters-category-select" v-model="filterStore.category" name="category" id="category">
                    <option class="shop__filters-category-select-value" value="all">All</option>
                    <option class="shop__filters-category-select-value" value="Outdoor Plants">Outdoor Plants</option>
                    <option class="shop__filters-category-select-value" value="Flowerpot on a stand">Flowerpot on a stand</option>
                    <option class="shop__filters-category-select-value" value="Potter Plants">Potter Plants</option>
                    <option class="shop__filters-category-select-value" value="Hanging Plants">Hanging Plants</option>
                </select>
            </div>
            <div class="shop__filters-price">
                <div class="shop__filters-price-block">
                    <label class="shop__filters-price-block-text" for="min">Price from: </label>
                    <input class="shop__filters-price-block-input" id="min" v-model="filterStore.minPrice" type="number">
                </div>
                <div class="shop__filters-price-block">
                    <label class="shop__filters-price-block-text" for="max">Price to: </label>
                    <input class="shop__filters-price-block-input" id="max" v-model="filterStore.maxPrice" type="number">
                </div>
            </div>
        </div>
        <div class="shop__cards">
            <template v-for="card in filterSize" :key="card.id">
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
    .shop{
        padding-top: 6rem;

        &__filters{
            display: flex;
            gap: 3rem;
            margin-bottom: 1.5rem;

            @media (max-width: 767px) {
                flex-direction: column;
                gap: 1rem;
            }

            &-price{
                display: flex;
                gap: 3rem;

                @media (max-width: 767px) {
                    flex-direction: column;
                    gap: 1rem;
                }

                &-block-input{
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
        }

        &__cards{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 3rem;
    
            @media (max-width: 979px) {
                grid-template-columns: repeat(3, 1fr);
            }
    
            @media (max-width: 767px) {
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }
    
            @media (max-width: 480px) {
                grid-template-columns: 60%;
                justify-content: center;
            }
        }
    }
</style>