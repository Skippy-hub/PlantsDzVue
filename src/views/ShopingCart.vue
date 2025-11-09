<script setup>
    import { RouterLink } from 'vue-router';
    import CartCards from '@/components/CartCards.vue';
    import { cardsToCart } from '@/stores/cardsToCart';
    import { computed, ref } from 'vue';

    const cardToCart = cardsToCart();

    const discount = ref(0);

    const discountFixed = computed(() => {
        if(discount.value || discount.value === 0){
            return discount.value.toFixed(2);
        } else{
            return discount.value = 0;
        }
    });

    function total(){
        let result = 0;
        
        if (cardToCart.cardsCountArr.length){
            for(const card of cardToCart.cardsCountArr){
                result += card.count * card.price;
            }
        }

        return result.toFixed(2);
    }

    const totalPrice = ref(0);

    const finalPrice = computed(() => {
        if ((total() - discount.value) < 0 || null || undefined){
            return totalPrice.value = 0;
        } else{
            return totalPrice.value = (total() - discount.value).toFixed(2) || 0;
        }
    });
</script>

<template>
    <section class="cart">
        <div class="cart__left">
            <div class="cart__left-title">
                <h3 class="cart__left-title-text mr1">Products</h3>
                <h3 class="cart__left-title-text mr2">Price</h3>
                <h3 class="cart__left-title-text mr3">Quantity</h3>
                <h3 class="cart__left-title-text">Total</h3>
            </div>
            <template v-if="cardToCart.cardsCountArr.length">
                <CartCards
                    v-for="card in cardToCart.cardsCountArr" :key="card.id"
                    :image="card.image" :title="card.title" :price="card.price" :id="card.id" :count="card.count"
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
                <input v-model="discount" class="cart__right-form-input" type="number" placeholder="Enter coupon code here...">
                <button @click.prevent="" class="cart__right-form-button">Apply</button>
            </form>
            <div class="cart__right-price">
                <div class="cart__right-price-subtotal">
                    <p class="cart__right-text">Subtotal</p>
                    <p class="cart__right-price-subtotal-number">${{ total() }}</p>
                </div>
                <div class="cart__right-price-discount">
                    <p class="cart__right-text">Coupon Discount</p>
                    <p class="cart__right-price-discount-number">(-) ${{ discountFixed }}</p>
                </div>
            </div>
            <div class="cart__right-total">
                <p class="cart__right-total-title">Total</p>
                <p class="cart__right-total-number">${{ finalPrice }}</p>
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
        
        &__left{
            max-width: 48.875rem;
            width: 100%;

            &-title{
                border-bottom: 1px solid #46A35850;
                display: flex;
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

    .mr1{
        margin-right: 15.3125rem;
    }

    .mr2{
        margin-right: 6.75rem;
    }

    .mr3{
        margin-right: 6rem;
    }

    .blank{
        text-align: center;
        font-size: 5rem;
        color: #000;
        margin-top: 3rem;
    }
</style>