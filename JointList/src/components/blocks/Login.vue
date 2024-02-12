<template>
<div class="statistic">
    <h1 v-if="account" class="title">E-mail: {{ account?.email }}</h1>
    <h1 v-if="account" class="title">Name: {{ account?.user_metadata.first_name }}</h1>
</div>
<form class="registration" @submit.prevent="console.log('hello')">
    <h1 v-if="!account" class="title">Login</h1>
    <my-input v-if="!account" class="registration-input" type="mail" name="email" :placeholderText="'email'" v-model="email" />
    <my-input v-if="!account" class="registration-input" type="password" name="password" :placeholderText="'password'" v-model="password" />
    <div class="buttons-wrapper">
        <default-btn v-if="!account" class="login-btn" @click="login">
            Login
        </default-btn>
        <default-btn v-if="!account" class="login-btn registration-btn" @click="$router.push('/registration')">Registration</default-btn>
    </div>
    
    <default-btn v-if="account" @click="store.logout" class="login-btn">
        Logout
    </default-btn>

    <div v-if="!account"  class="show-account">
        <p @click="showAccount = !showAccount">Account to view. Without registering.</p>
        <Collapse :when="showAccount">
            <div class="account">E-mail: fortestproject@tutanota.com</div>
            <div class="account">Password: 123456</div>
        </Collapse>
    </div>
    <preloader v-if="authLoader == 1"/>
    <span v-if="authLoader == 3" class="text text-error">Error. Incorrect login or password</span>
</form>
</template>

<script>
import {
    ref,
    onMounted,
    computed
} from 'vue';
import {
    useSupabaseStore
} from '@/stores/SupabaseStore';
import {
    supabase
} from '@/clients/supabase';
import { Collapse } from 'vue-collapsed';
export default {
    name: 'login',
    setup() {
        const store = useSupabaseStore();
        const todoList = store.todoLists;
        const account = ref(null);
        const authLoader = ref(computed(() => store.authLoader));
        const email = ref('');
        const password = ref('');
        const showAccount = ref(false);


        async function getSession() {
            const session = await supabase.auth.getSession();
            account.value = session?.data.session?.user;
        }
        onMounted(async () => {
            await getSession();
            console.log(account.value);
        });
        function login() {
            store.login(email.value, password.value);
            email.value = '';
            password.value = '';
        }
        return {
            todoList,
            store,
            account,
            email,
            password,
            authLoader,
            showAccount,
            login
        };
    },
    components: { Collapse }
}
</script>

<style lang="scss" scoped>
.statistic {
    margin: auto;
    margin-top: 10%;
}

.registration {
    margin: auto;
    margin-top: 8%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    width: clamp(17.5rem, 15.217rem + 13.04vw, 25rem);
    font-family: monospace;
    align-items: center;
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

.login-btn {
    padding: 3px;
    box-shadow: 0px 0px 0px 2px $turquoise;
    border-radius: 5px;
    width: fit-content;
}

.registration-btn {
    box-shadow: none;
}

.login-btn:active {
    background: $turquoise;
    color: black;
}

.login-btn:hover {
    background: $turquoise;
    color: black;
}

.show-account {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: auto;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 2px 2px -2px $turquoise;
}

.account{
    text-align: left;
    font-size: $font-size-big-normal;
}


.title {
    text-align: center;
    font-size: $font-size-main_title;
    font-weight: bold;
}

.text {
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
