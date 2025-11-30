<script setup lang="ts">
    import { ref } from 'vue';
    import { useAutorisation } from '../stores/useAutorisation';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const Autoris = useAutorisation();

    const id = Autoris.arrUsers.length + 1;

    const fName = ref<string>();
    const lName = ref<string>();
    const sex = ref<string>();
    const login = ref<string>();
    const pass = ref<string>();
    const repeatPass = ref<string>();


    function userAdd(){
        if(pass.value === repeatPass.value){
            if(fName.value && lName.value && sex.value && login.value && pass.value){
                Autoris.addUser(id, fName.value, lName.value, sex.value, login.value, pass.value);
                router.push('/');
                Autoris.isAuthenticated = true;
            } else{
                return alert('Not all fields are filled in');
            }
        }else{
            alert("The passwords don't match")
        }
    }
</script>

<template>
    <section class="signUp">
        <form class="signUp__form">
            <div class="signUp__form-block">
                <label class="signUp__form-block-text" for="fName">First name: </label>
                <input v-model="fName" class="signUp__form-block-input" type="text" id="fName">
            </div>
            <div class="signUp__form-block">
                <label class="signUp__form-block-text" for="lName">Last name: </label>
                <input v-model="lName" class="signUp__form-block-input" type="text" id="lNmae">
            </div>
            <div class="signUp__form-block signUp__form-block--sex">
                <label class="signUp__form-block-text" for="#">Sex: </label>
                <div class="signUp__form-block-subblock">
                    <div class="signUp__form-block-subblock--gender">
                        <label class="signUp__form-block-text" for="male">Male: </label>
                        <input v-model="sex" class="signUp__form-block-input" type="radio" name="sex" value="male" id="male">
                    </div>
                    <div class="signUp__form-block-subblock--gender">
                        <label class="signUp__form-block-text" for="female">Female: </label>
                        <input v-model="sex" class="signUp__form-block-input" type="radio" name="sex" value="female" id="female">
                    </div>
                </div>
            </div>
            <div class="signUp__form-block">
                <label class="signUp__form-block-text" for="email">Login: </label>
                <input v-model="login" class="signUp__form-block-input" type="email" id="email">
            </div>
            <div class="signUp__form-block">
                <label class="signUp__form-block-text" for="pass">Password: </label>
                <input v-model="pass" class="signUp__form-block-input" type="password" id="pass">
            </div>
            <div class="signUp__form-block">
                <label class="signUp__form-block-text" for="rPass">Repeat Password: </label>
                <input v-model="repeatPass" class="signUp__form-block-input" type="password" id="rPass">
            </div>
            <button class="signUp__form-button" @click.prevent="userAdd()" type="submit">Submit</button>
        </form>
    </section>
</template>

<style lang="scss" scoped>
    .signUp{
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
                justify-content: space-between;
                gap: 0.5rem;
                width: 100%;
                
                &-subblock{
                    display: flex;
                    width: 10rem;
                    align-items: center;
                    justify-content: space-around;
                    margin: 0 auto;
                    gap: 1rem;

                    &--gender{
                        display: flex;
                        gap: 0.5rem;
                    }
                }
            }

            &-block--sex{
                display: flex;
                flex-direction: column;

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
        }
    }
</style>