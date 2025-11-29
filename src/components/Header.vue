<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import { useCartStore } from '../stores/useCartStore';
    import { ref } from 'vue';

    const cartStore = useCartStore();
    const isActive = ref(false);
    function activeBurger(){
        isActive.value = !isActive.value;
    }
</script>

<template>
    <div :class="{active: isActive}" class="burger-menu">
        <nav class="burger-menu__nav">
            <ul class="burger-menu__nav-items">
                <li @click="activeBurger" class="burger-menu__nav-items-item"><RouterLink to="/" class="burger-menu__nav-items-item-text">Home</RouterLink></li>
                <li @click="activeBurger" class="burger-menu__nav-items-item"><RouterLink to="/shop" class="burger-menu__nav-items-item-text">Shop</RouterLink></li>
                <li @click="activeBurger" class="burger-menu__nav-items-item">
                    <RouterLink to="/favourite">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3
                                19.58 3 22 5.42 22 8.5
                                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="none" stroke="#000" stroke-width="1.5"/>
                    </svg>
                </RouterLink>
                </li>
                <li @click="activeBurger" class="burger-menu__nav-items-item">
                    <RouterLink to="/shop/shoping-cart" class="cart">
                        <svg class="header__options-img" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.1558 20.25H9.89066C6.78905 20.25 4.26569 17.7267 4.26569 14.6251V8.85947C4.26569 5.9762 2.82861 3.30739 0.421544 1.72031C-0.0107343 1.43531 -0.130077 0.853876 0.154921 0.421598C0.439919 -0.0107278 1.02131 -0.130118 1.45368 0.154974C2.82776 1.06097 3.94254 2.2559 4.73969 3.63167C4.91195 3.82466 6.30104 5.29699 8.57821 5.29699H19.3738C22.3191 5.24191 24.6245 8.19769 23.8544 11.0406L22.6117 15.9939C21.9829 18.4998 19.7394 20.25 17.1558 20.25ZM5.90415 6.64234C6.06001 7.36238 6.14068 8.10483 6.14068 8.85947V14.6251C6.14068 16.6928 7.82292 18.375 9.89066 18.375H17.1558C18.8782 18.375 20.3739 17.2082 20.793 15.5376L22.0358 10.5844C22.4933 8.89509 21.1233 7.13931 19.3738 7.17198H8.57817C7.54828 7.17198 6.65185 6.94993 5.90415 6.64234ZM9.42191 22.8281C9.42191 22.1809 8.89724 21.6563 8.25004 21.6563C6.69511 21.7182 6.69647 23.9387 8.25004 24C8.89724 24 9.42191 23.4753 9.42191 22.8281ZM18.75 22.8281C18.75 22.1809 18.2253 21.6563 17.5781 21.6563C16.0232 21.7182 16.0245 23.9387 17.5781 24C18.2253 24 18.75 23.4753 18.75 22.8281ZM20.3113 9.98446C20.3113 9.46668 19.8916 9.04697 19.3738 9.04697H8.95316C7.7093 9.09647 7.71023 10.8729 8.95316 10.922H19.3738C19.8916 10.922 20.3113 10.5022 20.3113 9.98446Z" fill="#3D3D3D"/>
                        </svg>
                        <p class="cart__count">{{ cartStore.cartCount }}</p>
                    </RouterLink>
                </li>
                <button class="burger-menu__nav-items-button">
                    <svg class="burger-menu__nav-items-button-img" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.1592 10.1006H8.125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.7202 7.67059L18.1602 10.1006L15.7202 12.5306" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.6332 6.35823C13.3582 3.3749 12.2415 2.29156 7.79985 2.29156C1.88235 2.29156 1.88235 4.21656 1.88235 9.9999C1.88235 15.7832 1.88235 17.7082 7.79985 17.7082C12.2415 17.7082 13.3582 16.6249 13.6332 13.6416" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Login
                </button>
            </ul>
        </nav>
    </div>
    <header class="header">
        <RouterLink to="/">
            <img class="header__logo" src="../assets/Logo.svg" alt="">
        </RouterLink>
        <div @click="activeBurger" :class="{active: isActive}" class="burger">
            <div class="line-up line"></div>
            <div class="line-middle line"></div>
            <div class="line-down line"></div>
        </div>
        <nav class="header__nav">
            <ul class="header__nav-list">
                <li class="header__nav-list-item"><RouterLink to="/" class="header__nav-list-item-link">Home</RouterLink></li>
                <li class="header__nav-list-item"><RouterLink to="/shop" class="header__nav-list-item-link">Shop</RouterLink></li>
            </ul>
        </nav>
        <div class="header__options">
            <RouterLink to="/favourite">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                            2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                            C13.09 3.81 14.76 3 16.5 3
                            19.58 3 22 5.42 22 8.5
                            c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            fill="none" stroke="#000" stroke-width="1.5"/>
                </svg>
            </RouterLink>
            <RouterLink to="/shop/shoping-cart" class="cart">
                <svg class="header__options-img" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.1558 20.25H9.89066C6.78905 20.25 4.26569 17.7267 4.26569 14.6251V8.85947C4.26569 5.9762 2.82861 3.30739 0.421544 1.72031C-0.0107343 1.43531 -0.130077 0.853876 0.154921 0.421598C0.439919 -0.0107278 1.02131 -0.130118 1.45368 0.154974C2.82776 1.06097 3.94254 2.2559 4.73969 3.63167C4.91195 3.82466 6.30104 5.29699 8.57821 5.29699H19.3738C22.3191 5.24191 24.6245 8.19769 23.8544 11.0406L22.6117 15.9939C21.9829 18.4998 19.7394 20.25 17.1558 20.25ZM5.90415 6.64234C6.06001 7.36238 6.14068 8.10483 6.14068 8.85947V14.6251C6.14068 16.6928 7.82292 18.375 9.89066 18.375H17.1558C18.8782 18.375 20.3739 17.2082 20.793 15.5376L22.0358 10.5844C22.4933 8.89509 21.1233 7.13931 19.3738 7.17198H8.57817C7.54828 7.17198 6.65185 6.94993 5.90415 6.64234ZM9.42191 22.8281C9.42191 22.1809 8.89724 21.6563 8.25004 21.6563C6.69511 21.7182 6.69647 23.9387 8.25004 24C8.89724 24 9.42191 23.4753 9.42191 22.8281ZM18.75 22.8281C18.75 22.1809 18.2253 21.6563 17.5781 21.6563C16.0232 21.7182 16.0245 23.9387 17.5781 24C18.2253 24 18.75 23.4753 18.75 22.8281ZM20.3113 9.98446C20.3113 9.46668 19.8916 9.04697 19.3738 9.04697H8.95316C7.7093 9.09647 7.71023 10.8729 8.95316 10.922H19.3738C19.8916 10.922 20.3113 10.5022 20.3113 9.98446Z" fill="#3D3D3D"/>
                </svg>
                <p class="cart__count">{{ cartStore.cartCount }}</p>
            </RouterLink>
            <button class="header__options-button">
                <svg class="header__options-button-img" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.1592 10.1006H8.125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.7202 7.67059L18.1602 10.1006L15.7202 12.5306" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.6332 6.35823C13.3582 3.3749 12.2415 2.29156 7.79985 2.29156C1.88235 2.29156 1.88235 4.21656 1.88235 9.9999C1.88235 15.7832 1.88235 17.7082 7.79985 17.7082C12.2415 17.7082 13.3582 16.6249 13.6332 13.6416" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Login
            </button>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 1.5625rem 1rem 1.125rem;
        position: fixed;
        max-width: 73rem;
        width: calc(100vw - 2rem);
        z-index: 999;
        background: #F5F5F5;

        &__nav{

            @media (max-width: 767px) {
                display: none;
            }

            &-list{
                display: flex;
                gap: 3.125rem;
                list-style: none;
                
                @media (max-width: 979px) {
                    gap: 2rem;
                }
                
                &-item:hover{
                    transform: scale(1.1);
                }

                &-item-link{
                    text-decoration: none;
                    color: #3d3d3d;

                    &:hover{
                        border-bottom: 2.5px solid #46A358;
                        color: #46A358;
                    }
                }
                
            }
        }

        &__options{
            display: flex;
            gap: 1.875rem;

            @media (max-width: 767px) {
                display: none;
            }

            &-img{
                cursor: pointer;
            }

            &-button{
                background: #46A358;
                color: #fff;
                border-radius: 0.375rem;
                padding: 0.5rem 1rem;
                border: transparent;
                display: flex;
                align-items: center;
                gap: 0.25rem;
                font-size: 1rem;
                line-height: 125%;
                cursor: pointer;
            }
        }
    }

    .burger{
        display: none;

        @media (max-width: 767px) {
            width: 2.5rem;
            height: 2rem;
            padding: 0.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
            cursor: pointer;
        }

        &-menu{
            visibility: hidden;
            opacity: 0;
            transform: translateY(-10px);
            transition: all .3s ease;
            padding: 1rem 0;
            background: #46A358;
            position: fixed;
            z-index: 999;
            height: 150px;
            margin-top: 5.375rem;
            width: calc(100vw - 2rem);
            
            &.active{
                @media (max-width: 767px) {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    visibility: visible;
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            &__nav{
                width: 100%;

                &-items{

                    @media (max-width: 767px) {
                        display: grid;
                        grid-template-columns: auto auto;
                        justify-content: center;
                        gap: 0.5rem;
                        list-style: none;
                    }
                    
                    &-item{
                        cursor: pointer;
                        width: 100px;
                        text-align: center;
                        padding: 0.25rem 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        &:hover{
                            background: #fff;
                        }
                        
                        &:hover *{
                            color: #000;
                        }
                    }

                    &-item-text{
                        color: #fff;
                        text-decoration: none;
                    }

                    &-button{
                        grid-column: 1/-1;
                        background: #fff;
                        border: transparent;
                        padding: 0.25rem 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                        font-size: 1rem;
                        line-height: 125%;
                        cursor: pointer;
                        border-radius: 0.375rem;

                        &-img *{
                            stroke: #46A358;
                        }
                    }
                }
            }
        }
    }

    .burger.active{
        .line-up{
            transform: translateY(0.65rem) rotate(-45deg);
        }

        .line-middle{
            transform: scaleX(0);
            opacity: 0;
        }

        .line-down{
            transform: translateY(-0.50rem) rotate(45deg);
        }
    }

    .line{
        transition: transform 0.3s ease, opacity 0.3s ease;
        transform-origin: center;
        width: 100%;
        height: 2px;
        background: #000;
    }

    .cart{
        position: relative;

        &__count{
            position: absolute;
            top: -0.25rem;
            right: -0.75rem;
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            background: #46A358;
            color: #fff;
            text-align: center;
            font-size: 0.75rem;
        }
    }
</style>