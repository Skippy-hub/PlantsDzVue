<script setup lang="ts">
    import { RouterLink, useRouter } from 'vue-router';
    import CartCard from '../components/CartCard.vue';
    import { useCartStore } from '../stores/useCartStore';
    import { ref } from 'vue';
    import close from '../assets/close.svg';

    const cartStore = useCartStore();
    const router = useRouter();

    const isVisible = ref<string>('none');

    function reset(){
        alert('Done!!!');
        cartStore.cardsCountArr = [];
        cartStore.disabled = false;
        cartStore.discount = 0;
        cartStore.discountInput = 0;
        cartStore.display = 'none';
        cartStore.applyText = 'Incorrect value';
        cartStore.saveCart();
        document.body.style.overflow = 'auto';
        router.push('/');
    }

    function openModal(){
        if(!cartStore.cardsCountArr.length) return alert('Cart is empty');
        isVisible.value = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(){
        isVisible.value = 'none';
        document.body.style.overflow = 'auto';
    }
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
                    :image="card.image" :title="card.title" :price="card.price" :id="card.id" :count="card.count!" :total="card.total!"
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
                <input v-model="cartStore.discountInput" :disabled="cartStore.disabled" class="cart__right-form-input" type="number" min="0" placeholder="Enter coupon code here...">
                <button @click.prevent="cartStore.apply()" class="cart__right-form-button">Apply</button>
            </form>
            <p class="cart__right-applyText" :style="{display: cartStore.display, color: cartStore.color}">{{ cartStore.applyText }}</p>
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
            <button @click="openModal" class="cart__right-checkout">Proceed To Checkout</button>
            <RouterLink to="/shop" class="cart__right-back">Continue Shopping</RouterLink>
        </div>
    </section>

    <div class="modal" :style="{display: isVisible}" @click="closeModal">
        <div class="modal__content" @click.stop="">
            <h2 class="modal__content-title">Order</h2>
            <div class="modal__content-details">
                <h3 class="modal__content-details-name">Order Details</h3>
                <div class="modal__content-details-cards">
                    <div class="modal__content-details-cards-card" v-for="card in cartStore.cardsCountArr">
                        <div class="modal__content-details-cards-card-left">
                            <img class="modal__content-details-cards-card-left-img" :src="card.image" alt="">
                            <h4 class="modal__content-details-cards-card-left-title">{{ card.title }}</h4>
                        </div>
                        <p class="modal__content-details-cards-card-count">(x {{ card.count }})</p>
                        <p class="modal__content-details-cards-card-total">${{ card.total?.toFixed(2) }}</p>
                    </div>
                </div>
                <div class="modal__content-details-price">
                    <div class="modal__content-details-price-block">
                        <p class="modal__content-details-price-block-text">Discount</p>
                        <p class="modal__content-details-price-block-text modal__content-details-price-block-text--bold">${{ cartStore.discount.toFixed(2) }}</p>
                    </div>
                    <div class="modal__content-details-price-block">
                        <p class="modal__content-details-price-block-text modal__content-details-price-block-text--bold">Total</p>
                        <p class="modal__content-details-price-block-text modal__content-details-price-block-text--green modal__content-details-price-block-text--bold">${{ cartStore.finalPrice.toFixed(2) }}</p>
                    </div>
                </div>
            </div>
            <button @click="reset" class="modal__content-button">Pay order</button>
            <img :src="close" @click="isVisible = 'none'" class="modal__content-close"></img>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .modal{
        position: fixed;
        background: #00000050;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;

        &__content{
            max-width: 35rem;
            width: 100%;
            background: #fff;
            border-radius: 0.375rem;
            text-align: center;
            padding: 0.75rem 1.5rem;
            position: relative;

            &-title{
                font-weight: 700;
                font-size: 2rem;
                left: 100%;
                color: #3d3d3d;
            }
            
            &-details{
                margin-bottom: 1.5rem;
                border-bottom: 1px solid #00000050;
                padding-bottom: 0.5rem;
                
                &-name{
                    color: #3d3d3d;
                    font-size: 1rem;
                    font-weight: 700;
                    line-height: 100%;
                    text-align: left;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid #00000050;
                    margin-bottom: 1rem;
                }

                &-cards{
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    border-bottom: 1px solid #00000050;
                    padding-bottom: 0.5rem;
                    margin-bottom: 1rem;
                    max-height: 25rem;
                    overflow: auto;

                    &-card{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 1rem;
    
                        &-left{
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            width: 100%;
    
                            &-img{
                                max-width: 4.375rem;
                                width: 100%;
                            }
    
                            &-title{
                                color: #3d3d3d;
                                font-size: 1.125rem;
                                font-weight: 700;
                                line-height: 100%;
                            }
                        }
    
                        &-count{
                            color: #727272;
                            font-size: 1rem;
                            line-height: 100%;
                            width: 10rem;
                        }
    
                        &-total{
                            color: #46A358;
                            font-size: 1.25rem;
                            line-height: 100%;
                            font-weight: 700;
                            width: 15rem;
                        }
                    }
                }

                &-price{
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;

                    &-block{
                        display: flex;
                        justify-content: space-between;
                        margin: 0 auto;
                        max-width: 20rem;
                        width: 100%;

                        &-text{
                            font-size: 1rem;
                            color: #3d3d3d;
                            line-height: 100%;

                            &--bold{
                                font-weight: 700;
                            }
    
                            &--green{
                                color: #46A358;
                            }
                        }

                    }
                }
            }

            &-button{
                color: #fff;
                font-size: 1rem;
                line-height: 100%;
                font-weight: 700;
                background: #46A358;
                border-radius: 0.375rem;
                border: transparent;
                padding: 0.75rem 1.125rem;
            }

            &-close{
                cursor: pointer;
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
                width: 1.5rem;
                height: 1.5rem;
            }
        }
    }

    .cart{
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        color: #3d3d3d;
        padding-top: 7rem;
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
                display: grid;
                grid-template-columns: minmax(100px, 300px) minmax(70px, 160px) minmax(100px, 150px) 80px;
                padding-bottom: 0.6875rem;
                margin-bottom: 1rem;

                &-text{
                    font-weight: 700;
                    font-size: 1rem;
                    line-height: 100%;

                    @media (max-width: 540px) {
                        display: none;
                    }
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

            &-applyText{
                position: relative;
                top: -1.875rem;
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