<script setup>
    import { useRoute } from 'vue-router';
    import { ref, onMounted, toRaw } from 'vue';
    //toRaw - снимает обёртку proxy (не пригодилось)

    const route = useRoute();
    const id = route.params.id;

    const count = ref(1);

    const img = ref();
    const title = ref();
    const price = ref();
    const category = ref();
    const size = ref(); 
    let card;

    async function plants() {
        const response = await fetch('../../Plants.json');
        const data = await response.json();
        card = data.filter((card) => card.id == id);
        title.value = card[0].title;
        img.value = card[0].image;
        price.value = card[0].price;
        category.value = card[0].category;
        size.value = card[0].size;
    }
    
    onMounted(() => {
        plants();
    });

    function decrement(value){
        if(value > 1){
            count.value--;
        }else{
            return;
        }
    }
</script>

<template>
    <section class="shopCard">
        <img class="shopCard__img" :src="img" alt="">
        <div class="shopCard__specification">
            <div  class="shopCard__specification-header">
                <h1 class="shopCard__specification-header-title">{{ title }}</h1>
                <p class="shopCard__specification-header-price">${{ price }}</p>
            </div>
            <div class="shopCard__specification-descriptuon">
                <h4 class="shopCard__specification-description-title">Short description:</h4>
                <p class="shopCard__specification-description-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque adipisci eaque soluta quaerat a dolorem omnis aut, ipsa provident est. Quisquam, non nam. A cum commodi rerum quaerat vitae? Molestiae.</p>
                <p class="shopCard__specification-description-text"><span class="shopCard__specification-description-text-size">Size:</span> {{ size }}</p>
            </div>
            <div class="shopCard__specification-cart">
                <div class="shopCard__specification-cart-count">
                    <button class="shopCard__specification-cart-count-button btn" @click="decrement(count)">-</button>
                    <p class="shopCard__specification-cart-count-text">{{ count }}</p>
                    <button class="shopCard__specification-cart-count-button btn" @click="count++">+</button>
                </div>
                <div class="shopCard__specification-cart-buttons">
                    <button class="shopCard__specification-cart-buttons-button btn">buy now</button>
                    <button class="shopCard__specification-cart-buttons-button btn">add to cart</button>
                    <button class="shopCard__specification-cart-buttons-button btn">favorites</button>
                </div>
            </div>
            <div class="shopCard__specification-tags">
                <p class="shopCard__specification-tags-text"><span class="shopCard__specification-tags-text-bold">Category:</span> {{ category }}</p>
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
                    display: flex;
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
</style>