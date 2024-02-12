import {defineStore} from 'pinia';
import {supabase} from '../clients/supabase'
import router from '../router/router';
import { useTasksStore } from './TasksStore';
import { 
    watch,
    ref,
    onMounted,
    computed
} from 'vue';

export const useSupabaseStore = defineStore ('supabaseStore', () => {
    const tasksStore = useTasksStore();
    const todoLists = ref(computed(() => tasksStore.todoLists) );


//supabase functions
    const userId = ref('');
    const tasksLoader = ref(false);
    const authLoader = ref(0);

    async function getUserId() {
        const account = await supabase.auth.getSession();
        if(account.data.session === null){
            console.log('no session')
            return
        } else {
            userId.value = account.data?.session?.user.id
            getDataByUserId(userId.value)
        }
    }

    async function createArray (array, id) {
    const { data, error } = await supabase
        .from('tasks')
        .insert([
            { tasks_array: todoLists.value, user_id: userId.value},
        ])
        .select()
        if(data) {
        } if(error) {
            console.log('insert error',error)
        }
    }

    async function getDataByUserId(userId) {
        let arrayFromServer = [];
        tasksLoader.value = false;
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId);
    try {
        tasksLoader
        if (data) {
            arrayFromServer = Object.values(data[0].tasks_array)
            tasksStore.writeArray(arrayFromServer);
            tasksLoader.value = true;
        } if (error) {
            console.log('data id error',error)
            tasksLoader.value = true;
        }
    } catch(error) {
        console.log('no data', error)
        createArray(todoLists.value, userId.value)
        
    }
    
}

    async function createAccount(email, password, name) {
        authLoader.value = 1;
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,

        options: {
            data: {
                first_name: name,
            }
        }
    })
    if (error) {
        console.log(error) 
        authLoader.value = 3;
    } else {
        authLoader.value = 4;
    }
}


    async function login(mail, password) {
        authLoader.value = 1;
    const { data, error } = await supabase.auth.signInWithPassword({
        email: mail,
        password: password,
    })
    if (error) {
        console.log(error)
        authLoader.value = 3;
    } else {
        authLoader.value = 2;
        getUserId()
        router.push('/calendar')
    }
    
    }


    async function updateArray(userId) {
    const { data, error } = await supabase
        .from('tasks')
        .update({ tasks_array: todoLists.value })
        .eq('user_id', userId)
        .select('*')
        if(data) {
        } if(error) {
            console.log(error)
        }
}

watch(() => todoLists, (state) => {
    updateArray(userId.value)
},{deep:true})
onMounted(() => {
        getUserId()
})

async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.log(error)
    } else {
        router.push('/registration')
        tasksLoader.value = false;
        userId.value = '';
        tasksStore.writeArray([]);
    }
}

    return {
        userId,
        tasksLoader,
        authLoader,
        tasksStore,
        logout,
        login,
        createAccount,
    }
})