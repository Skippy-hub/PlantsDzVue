<script setup lang="ts">
    import { RouterLink, useRouter } from 'vue-router';
    import { ref } from 'vue';
    import { useAutorisation } from '../stores/useAutorisation';

    const Autoris = useAutorisation();
    const router = useRouter();

    const login = ref<string>();
    const pass = ref<string>();

    function submit(){
        if (login.value && pass.value){
            Autoris.searchUser(login.value, pass.value);
            if (Autoris.isAuthenticated){
                router.push('/');
            } else{
                return;
            }
        } else{
            return alert('input values');
        }
    }
</script>

<template>
    <section class="signIn">
        <form class="signIn__form">
            <div class="signIn__form-block">
                <label class="signIn__form-block-text" for="login">Login: </label>
                <input v-model="login" class="signIn__form-block-input" type="email" id="login">
            </div>
            <div class="signIn__form-block">
                <label class="signIn__form-block-text" for="pass">Password: </label>
                <input v-model="pass" class="signIn__form-block-input" type="password" id="pass">
            </div>
            <button @click.prevent="submit" class="signIn__form-button" type="submit">Submit</button>
            <RouterLink class="signIn__form-link" to="/autorisation/sign-up">Sing Up</RouterLink>
        </form>
    </section>
</template>

<style lang="scss" scoped>
    .signIn{
        padding-top: 5.375rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: url('https://cdn.pixabay.com/photo/2017/03/01/23/38/flower-2109956_1280.jpg');

        &__form{
            background: #ffffffbb;
            padding: 1.5rem;
            border-radius: 0.375rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;

            &-block{
                display: flex;
                gap: 0.5rem;
                width: 100%;
                justify-content: space-between;
            }

            &-button{
                background: #46A358;
                color: #fff;
                border: transparent;
                padding: 0.5rem 0;
                border-radius: 0.375rem;
                font-size: 1rem;
                line-height: 100%;
                width: 100%;
            }

            &-link{
                text-decoration: none;
                color: #000;
                border: 1px solid #000;
                padding: 0.25rem 0.5rem;
            }
        }
    }
</style>