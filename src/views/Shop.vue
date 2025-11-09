<script setup>
    import { ref, onMounted, computed } from 'vue';
    import CardsPlants from '@/components/CardsPlants.vue';


    const cards = ref([]);
    const size = ref('all');

    const minPrice = ref();
    const maxPrice = ref();

    async function plants() {
        const response = await fetch('../../Plants.json');
        const data = await response.json();
        cards.value = data;
    }

    onMounted(() => {
        plants();
    });

    const filterSize = computed(() => {
        if(size.value == 'all'){
            return cards.value;
        }else{
            return cards.value.filter((card) => card.size == size.value);
        }
    });
</script>

<template>
    <section class="shop">
        <div class="shop__filters">
            <div class="shop__filters-size">
                <label class="shop__filters-size-text" for="size">Size: </label>
                <select class="shop__filters-size-select" v-model="size" name="size" id="size">
                    <option class="shop__filters-size-select-value" value="all">All</option>
                    <option class="shop__filters-size-select-value" value="small">Small</option>
                    <option class="shop__filters-size-select-value" value="medium">Medium</option>
                    <option class="shop__filters-size-select-value" value="large">Large</option>
                </select>
            </div>
            <div class="shop__filters-price">
                <div class="shop__filters-price-block">
                    <label class="shop__filters-price-block-text" for="min">Price from: </label>
                    <input class="shop__filters-price-block-input" id="min" v-model="minPrice" type="number">
                </div>
                <div class="shop__filters-price-block">
                    <label class="shop__filters-price-block-text" for="max">Price to: </label>
                    <input class="shop__filters-price-block-input" id="max" v-model="maxPrice" type="number">
                </div>
            </div>
        </div>
        <div class="shop__cards">
            <template v-for="card in filterSize" :key="card.id">
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
    .shop{

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