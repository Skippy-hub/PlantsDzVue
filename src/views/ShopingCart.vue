<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import CartCard from '../components/CartCard.vue';
    import { useCartStore } from '../stores/useCartStore';

    const cartStore = useCartStore();
</script>

<template>
    <section class="cart">
        <div class="cart__left">
            <div class="cart__left-title">
                <h3 class="cart__left-title-text">Products</h3>
                <h3 class="cart__left-title-text">Price</h3>
                <h3 class="cart__left-title-text">Quantity</h3>
                <h3 class="cart__left-title-text">Total</h3>
            </div>
            <template v-if="cartStore.cardsCountArr.length">
                <CartCard
                    v-for="card in cartStore.cardsCountArr" :key="card.id"
                    :image="card.image" :title="card.title" :price="card.price" :id="card.id" :count="card.count" :total="card.total"
                />
            </template>
            <template v-else>
                <p class="blank">Cart is empty</p>
            </template>
        </div>
        <div class="cart__right">
            <h3 class="cart__right-title">Cart Totals</h3>
            <p class="cart__right-text">Coupon Apply</p>
            <form class="cart__right-form" action="">
                <input v-model="cartStore.discount" class="cart__right-form-input" type="number" min="0" placeholder="Enter coupon code here...">
                <button @click.prevent="" class="cart__right-form-button">Apply</button>
            </form>
            <div class="cart__right-price">
                <div class="cart__right-price-subtotal">
                    <p class="cart__right-text">Subtotal</p>
                    <p class="cart__right-price-subtotal-number">${{ cartStore.total().toFixed(2) }}</p>
                </div>
                <div class="cart__right-price-discount">
                    <p class="cart__right-text">Coupon Discount</p>
                    <p class="cart__right-price-discount-number">(-) ${{ cartStore.discountFixed }}</p>
                </div>
            </div>
            <div class="cart__right-total">
                <p class="cart__right-total-title">Total</p>
                <p class="cart__right-total-number">${{ cartStore.finalPrice.toFixed(2) }}</p>
            </div>
            <button class="cart__right-checkout">Proceed To Checkout</button>
            <RouterLink to="/shop" class="cart__right-back">Continue Shopping</RouterLink>
        </div>
    </section>
</template>

<style scoped lang="scss">
    .cart{
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        color: #3d3d3d;
        padding-top: 2.25rem;
        padding-bottom: 5.4375rem;

        @media (max-width: 979px) {
            flex-direction: column;
            align-items: center;
        }
        
        &__left{
            max-width: 48.875rem;
            width: 100%;

            &-title{
                border-bottom: 1px solid #46A35850;
                // display: flex;
                display: grid;
                grid-template-columns: minmax(100px, 300px) minmax(70px, 160px) minmax(100px, 150px) 80px;
                padding-bottom: 0.6875rem;
                margin-bottom: 1rem;

                &-text{
                    font-weight: 700;
                    font-size: 1rem;
                    line-height: 100%;
                }
            }
        }
        
        &__right{
            max-width: 20.5rem;
            width: 100%;

            &-title{
                font-weight: 600;
                font-size: 1.125rem;
                line-height: 88%;
                border-bottom: 1px solid #46A35850;
                padding-bottom: 0.6875rem;
                margin-bottom: 0.6875rem;
            }

            &-text{
                font-size: 0.875rem;
                line-height: 114%;
            }

            &-form{
                display: flex;
                justify-content: space-between;
                border-radius: 0.375rem;
                margin: 0.5rem 0 1.875rem;

                &-input{
                    padding: 0.75rem;
                    padding-right: 0;
                    font-size: 0.875rem;
                    line-height: 100%;
                    border-radius: 0.375rem 0 0 0.375rem;
                    border: transparent;
                    width: 77%;
                    border: 1px solid #46A358;

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

                &-button{
                    background: #46A358;
                    border-radius: 0 0.375rem 0.375rem 0;
                    border: transparent;
                    color: #fff;
                    padding: 0.75rem 1.5625rem 0.75rem 2.1875rem;
                    font-size: 1rem;
                    line-height: 100%;
                    font-weight: 700;
                    cursor: pointer;
                }
            }

            &-price{
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-bottom: 1.25rem;

                &-subtotal{
                    display: flex;
                    justify-content: space-between;
                    gap: 1rem;

                    &-number{
                        font-weight: 700;
                        font-size: 1.125rem;
                        line-height: 88%;
                    }
                }

                &-discount{
                    display: flex;
                    justify-content: space-between;
                    gap: 1rem;
    
                    &-number{
                        font-size: 1rem;
                        line-height: 100%;
                    }
                }
            }


            &-total{
                display: flex;
                justify-content: space-between;
                gap: 1rem;
                margin-bottom: 1.875rem;

                &-title{
                    font-weight: 700;
                    font-size: 1rem;
                    line-height: 100%;
                }

                &-number{
                    font-weight: 700;
                    font-size: 1rem;
                    line-height: 100%;
                    color: #46A358;
                }
            }
            
            &-checkout{
                background: #46A358;
                border-radius: 0.1875rem;
                color: #fff;
                border: transparent;
                font-size: 1rem;
                line-height: 100%;
                font-weight: 700;
                padding-block: 0.75rem;
                width: 100%;
                margin-bottom: 0.875rem;
                cursor: pointer;
            }

            &-back{
                color: #46A358;
                font-size: 1rem;
                line-height: 1rem;
                text-decoration: none;
                display: flex;
                justify-content: center;
            }
        }
    }
    
    .blank{
        text-align: center;
        font-size: 5rem;
        color: #000;
        margin-top: 3rem;
    }
</style>