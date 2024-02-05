<template>
    <div class="registration" @click="console.log(useTasksStore().userId)">
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
        <span class="text">Check your email after submitting the registration form</span>
    </div>
</template>
<script setup>
import {ref} from 'vue';
import {supabase} from '../clients/supabase'
import {useTasksStore} from '../stores/TasksStore'
import router from '../router/router';
const email = ref('');
const password = ref('');
const name = ref('');

async function createAccount() {
    const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,

        options: {
            data: {
                first_name: name.value,
            }
        }
    })

    if (error) {
        console.log(error) 
    } else {
        console.log(data) 
    }
    email.value = '';
    password.value = '';
    name.value = '';
}

async function login() {
    useTasksStore().login(email.value, password.value)
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
        background: $turquoise;
        border-radius: 5px;
    }

    .title {
        margin: auto;
        font-size: $font-size-main_title;
        font-weight: bold;
    }
    .text {
        margin: auto;
        font-size: $font-size-big-normal;
        text-align: center;
    }
</style>