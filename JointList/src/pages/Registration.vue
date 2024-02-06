<template>
    <div class="registration">
        <h1 class="title">Entry</h1>
        <h4 class="text">Use email address</h4>

        <my-input class="registration-input mail" type="mail" :placeholderText="'mail'" v-model="email"></my-input>
        <my-input class="registration-input password" type="password" :placeholderText="'password'" v-model="password"></my-input>
        <span class="text">Entry name for registration</span>
        <my-input class="registration-input name" type="name" :placeholderText="'name'" v-model="name"></my-input> 
        
        <div class="buttons-wrapper">
            <default-btn class="registration-btn"
            @click="createAccount"
            >
            Registration
            </default-btn>
            <default-btn class="registration-btn"
            @click="login"
            >
            Login
        </default-btn>
        </div>
        <preloader v-if="authLoader == 1"/>
        <span v-if="authLoader == 2" class="text text-successfully">Great! Check your email. Follow the link from the letter and log in.</span>
        <span v-if="authLoader == 3" class="text text-error">Error. Invalid input</span>
    </div>
</template>
<script setup>
import {ref, computed} from 'vue';
import {useTasksStore} from '../stores/TasksStore'
const email = ref('');
const password = ref('');
const name = ref('');
const authLoader = ref(computed (() => useTasksStore().authLoader))
console.log(authLoader.value, 'authloader')

async function createAccount() {
    useTasksStore().createAccount(email.value, password.value, name.value)
    email.value = '';
    password.value = '';
    name.value = '';
}

async function login() {
    useTasksStore().login(email.value, password.value);
    email.value = '';
    password.value = '';
    }



</script>
<style lang="scss">
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
        gap: 20px;
        margin: auto;
        padding: 15px;
    }
    
    .registration-btn {
        padding: 3px;
        box-shadow: 0px 0px 0px 2px $turquoise;
        border-radius: 5px;
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
        color: rgba(238, 45, 45, 0.506);
    }
</style>