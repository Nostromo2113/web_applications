<template>
    <div>
        <Registration v-if="false"  />
        <login/>
    </div>
</template>
<script setup>

import { useTasksStore } from '../stores/TasksStore';
import Registration from './Registration.vue';
import {ref, onMounted} from 'vue';
import {supabase} from '../clients/supabase'
const store = useTasksStore();

const account = ref('');

async function getSession() {
    account.value = await supabase.auth.getSession();
    account.value = account.value?.data.session.user
    return
}



</script>
<style lang="scss" scoped>
    
</style>