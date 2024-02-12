<template>
    <div>
    <form class="registration" @submit.prevent="console.log('hello')">
        <h1 class="title">Registration</h1>
        <h4 class="text">Use email address</h4>

            <my-input class="registration-input mail" type="mail" name="email" :placeholderText="'email'" v-model="email"/>

            <my-input class="registration-input password" type="password" name="password" :placeholderText="'password'" v-model="password"/>

            <my-input class="registration-input" type="password" name="check-password" :placeholderText="'password repeat'" v-model="checkPassword"/>

    <label class="text" for="name">Entry name. Not necessary</label>
    <my-input id="name" class="registration-input input-name" type="name" :placeholderText="'name'" name="name" v-model="name"/>
        <div class="buttons-wrapper">
            <default-btn class="registration-btn"
            @click="createAccount"
            >
            Registration
            </default-btn>
            <default-btn class="registration-btn login-btn"
                    @click="$router.push('/')"
                    >
                    Login
                </default-btn>
        </div>
        <preloader v-if="authLoader == 1"/>
        <span v-if="authLoader == 4" class="text text-successfully">Great! Check your email. Follow the link from the letter and log in.</span>
        <span v-if="authLoader == 3 && !mismatchPassword" class="text text-error">Error. Incorrect login or password</span>
        <span v-if="mismatchPassword" class="text text-error">Password mismatch</span>
    </form>
    </div>
</template>
<script setup>
import {ref, computed} from 'vue';
import {useSupabaseStore} from '@/stores/SupabaseStore'
const email = ref('');
const password = ref('');
const checkPassword = ref('');
const mismatchPassword = ref(false);
const name = ref('');
const supabaseStore = useSupabaseStore();
const authLoader = ref(computed (() => supabaseStore.authLoader))
console.log(authLoader.value, 'authloader')

async function createAccount() {
    if(password.value === checkPassword.value){
    supabaseStore.createAccount(email.value, password.value, name.value);
    } else {
        console.log('mismatch')
        mismatchPassword.value = true;
    }
    email.value = '';
    password.value = '';
    checkPassword.value = '';
    name.value = '';
}



</script>
<style lang="scss" scoped>
    .registration {
        margin: auto;
        margin-top: 8%;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 20px;
        width: clamp(17.5rem, 15.217rem + 13.04vw, 25rem);
        font-family: monospace;
    }
    .registration-input {
        width: 100%;
    }
    .buttons-wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: auto;
        padding: 15px;
        align-items: center;
    }
    
    .registration-btn {
        padding: 3px;
        box-shadow: 0px 0px 0px 2px $turquoise;
        border-radius: 5px;
    }
    .login-btn {
        box-shadow: none;
        margin: auto;
    }
    .registration-btn:active {
        background: $turquoise;
        color: black;
    }

    .registration-btn:hover {
        background: $turquoise;
        color: black;
    }

    .title {
        margin: auto;
        font-size: $font-size-main_title;
        font-weight: bold;
    }
    .text {
        margin: auto;
        font-size: $font-size-title;
        text-align: center;
    }
    
    .text-successfully {
        color: $turquoise;
    }

    .text-error {
        color: rgb(241 32 32 / 67%);
    }
</style>