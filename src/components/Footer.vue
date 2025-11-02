<script setup>
    import { RouterLink } from 'vue-router';
    import FooterCard from './FooterCard.vue';
    import pineappleImg from '../assets/icons/pineapple.svg';
    import teaImg from '../assets/icons/tea.svg';
    import cactusImg from '../assets/icons/cactus.svg';

    const cards = [
        {
            image: pineappleImg,
            title: 'Garden Care',
            description: 'We are an online plant shop offering a wide range of cheap and trendy plants.',
        },
        {
            image: cactusImg,
            title: 'Plant Renovation',
            description: 'We are an online plant shop offering a wide range of cheap and trendy plants.',
        },
        {
            image: teaImg,
            title: 'Watering Graden',
            description: 'We are an online plant shop offering a wide range of cheap and trendy plants.',
        },
    ];
</script>

<template>
    <footer class="footer">
        <div class="footer__up">
            <div class="footer__up-cards">
                <FooterCard
                    v-for="card in cards"
                        :image="card.image" :title="card.title" :description="card.description"
                />
            </div>
            <div class="footer__up-block">
                <h4 class="footer__up-block-title">Would you like to join newsletters?</h4>
                <form class="footer__up-block-form" action="">
                    <div class="footer__up-block-form-inside">
                        <input class="footer__up-block-form-input" type="text" placeholder="enter your email address...">
                        <button @click.prevent="" class="footer__up-block-form-button">Join</button>
                    </div>
                </form>
                <p class="footer__up-block-text">We usually post offers and challenges in newsletter. We’re your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to yours!</p>
            </div>
        </div>
        <div class="footer__middle">
            <RouterLink to="/"><img class="footer__middle-img" src="../assets/icons/Logo.svg" alt=""></img></RouterLink>
            <p class="footer__middle-text">70 West Buckingham Ave.<br>Farmingdale, NY 11735</p>
            <a class="footer__middle-text"  href="mailto: mail@gmail.com">contact@greenshop.com</a>
            <a class="footer__middle-text" href="tel:+7777777">+88 01911 717 490</a>
            <RouterLink to="/About" class="footer__middle-text">About us</RouterLink>
        </div>
        <p class="footer__copyleft">&#127279; 2021 GreenShop. All Rights Reserved.</p>
    </footer>
</template>

<style lang="scss" scoped>
    .footer{
        padding: 1.5625rem 0 0.8125rem;

        &__up{
            display: flex;
            gap: 3.875rem;
            padding: 0 1.5rem 1.5rem;

            @media (max-width: 979px) {
                flex-direction: column;
            }

            &-cards{
                display: flex;
                gap: 3.875rem;

                @media (max-width: 480px) {
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
            }

            &-block{
                max-width: 22.125rem;
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 1.125rem;

                &-title{
                    font-weight: 700;
                    font-size: 1.125rem;
                    line-height: 89%;
                }

                &-form{
                    &-inside{
                        box-shadow: 0px 0px 20px 0px #00000060;
                        display: flex;
                        justify-content: space-between;
                        border-radius: 0.375rem;
                    }

                    &-input{
                        padding: 0.75rem;
                        padding-right: 0;
                        font-size: 0.875rem;
                        line-height: 100%;
                        border-radius: 0.375rem 0 0 0.375rem;
                        border: transparent;
                        width: 77%;

                        &:focus{
                            outline: none;
                        }
                    }

                    &-button{
                        background: #46A358;
                        border-radius: 0 0.375rem 0.375rem 0;
                        border: transparent;
                        color: #fff;
                        padding: 0.75rem 1.625rem;
                        font-size: 1rem;
                        line-height: 100%;
                        font-weight: 700;
                        cursor: pointer;
                    }
                }

                &-text{
                    font-size: 0.8125rem;
                    line-height: 169%;
                    color: #727272;
                }
            }
        }

        &__middle{
            background: #46A35810;
            display: flex;
            justify-content: space-between;
            padding:  1.625rem 1.5rem 1.125rem;

            @media (max-width: 767px) {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }

            &-text{
                color: #3d3d3d;
                font-size: 0.875rem;
                line-height: 157%;
                text-decoration: none;
            }
        }

        &__copyleft{
            text-align: center;
            font-size: 0.875rem;
            line-height: 214%;
            color: #3d3d3d;
        }
    }
</style>