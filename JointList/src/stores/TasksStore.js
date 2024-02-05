import {defineStore} from 'pinia';
import {supabase} from '../clients/supabase'
import router from '../router/router'
import { 
    watch,
    ref,
    onMounted,
} from 'vue';

export const useTasksStore = defineStore ('tasksStore', () => {

    const todoLists = ref([]);
    const searchQuery = ref('');


//supabase functions
    const userId = ref('');
    const tasksLoader = ref(false);


    async function getUserId() {
        const account = await supabase.auth.getSession();
        userId.value = account.data.session.user.id
        console.log(userId.value)
        getDataByUserId(userId.value)
    }
    

    async function createArray (array, id) {
    const { data, error } = await supabase
        .from('tasks')
        .insert([
            { tasks_array: todoLists.value, user_id: userId.value},
        ])
        .select()
        if(data) {
            console.log('insert',data)
        } if(error) {
            console.log('insert error',error)
        }
    }

    async function getDataByUserId(userId) {
        console.log(userId)
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId);
    try {
        if (data) {
            todoLists.value = Object.values(data[0].tasks_array)
            console.log(todoLists.value)
        } if (error) {
            console.log('data id error',error)

        }
    } catch(error) {
        console.log('no data', error)
        createArray(todoLists.value, userId.value)
        
    }
    tasksLoader.value = true;
}

    async function login(mail, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: mail,
        password: password,
    })
    if (error) {
        console.log(error)
    } else {
        console.log(data)
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
            console.log('update',data)
        } if(error) {
            console.log(error)
        }
}

watch(() => todoLists, (state) => {
    updateArray(userId.value)
},{deep:true})

async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.log(error)
    } else {
        console.log("Logout create")
        todoLists.value = [];
        router.push('/registration')
    }
}



///////////////////MAIN FUNCKTIONS

    const updateSearchQuery = (value) => {
        searchQuery.value = value;
    };


    const deleteTask = (taskId) => {
            const index = todoLists.value.findIndex((task) => task.id === taskId);
                if (index !== -1) {
                    todoLists.value.splice(index, 1);
                }            
        };
    const redactionTaskElement = (obj) => {
            todoLists.value.forEach((item) => {
                item.list.forEach((el) => {
                    if (el.id === obj.id) {
                        Object.assign(el, obj);
                    }
                });
            });
    };
    const createTasksElement = (element, id) => {
            todoLists.value.forEach((el) => {
                if (el.id === id) {
                    el.list.push(element);
                }
            });
    };
    const removeTasksElement = (id) => {
            todoLists.value.forEach((item) => {
                item.list = item.list.filter((el) => el.id !== id);
            });
    };
    const createTasks = (task) => {
        if(task.title !== ''){
                todoLists.value.push(task);
        }
    };
    const sortedPosts = () => {
        const todoList = [...todoLists.value].sort(
            (post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
        );
    };

    const sortedAndSearchedPosts =  () => {
        const todoList = todoLists.value.filter((task) => task.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
        return todoList;
    };
    const addCalendarMark = (taskItems, day) => {
            const formatDay = day.toLocaleString().split(',')[0];
            todoLists.value.forEach(el => {
                if(el.id === taskItems.id) {
                    el.calendarMark = formatDay;
                    el.unformattedCalendarMark = day;
                    console.log(el.unformattedCalendarMark)
                }
            })
    };
    

    //CALENDAR MODULE


    const clickDayDialog = ref(new Date())
    const clickDay = ref(new Date())
    const todoListsCalendarFiltred = ref([])
    const dialog = ref(Boolean)

    const getTasksForToday = (clickDayFullWindow) => {  

            todoListsCalendarFiltred.value = todoLists.value.filter(
            (task) => new Date(task.unformattedCalendarMark).setHours(0, 0, 0, 0) === new Date(clickDay.value).setHours(0, 0, 0, 0)
            );
    }


    const getClickDay = (date, dialog) => {
        if(dialog){
            clickDayDialog.value = date
        } else {
            clickDay.value = date
        }
    }

    onMounted(() => {
        getTasksForToday(clickDay)
    })

    // watch(clickDayData, () => {
    //         getTasksForToday(clickDayData)
    // },{deep:true})

    watch([clickDay, todoLists], ([newValue1, newValue2], [oldValue1, oldValue2]) => {
        getTasksForToday(clickDay)
    },{deep: true});


    //CALENDAR MODULE






    

    // watch(() => todoLists, (state) => {
    //     localStorage.setItem('todoLists', JSON.stringify(state))
    // }, {deep: true});

    // const todoListsOnLocalStorage = localStorage.getItem('todoLists')
    //     if(todoListsOnLocalStorage){
    //         todoLists.value = (JSON.parse(todoListsOnLocalStorage))._value
    //     //UNDERLINE ИСПОЛЬЗУЕТСЯ ДЛЯ ПОЛУЧЕНИЯ РЕАЛЬНОГО ЗНАЧЕНИЯ ПЕРЕМЕННОЙ
    // }

    return {
        todoLists,
        searchQuery,
        sortedPosts,
        sortedAndSearchedPosts,
        deleteTask,
        redactionTaskElement,
        createTasksElement,
        removeTasksElement,
        createTasks,
        updateSearchQuery,
        addCalendarMark,

        //calendar
        clickDay,
        clickDayDialog,
        todoListsCalendarFiltred,
        dialog,
        getTasksForToday,
        getClickDay,

        //async
        userId,
        tasksLoader,
        logout,
        login
    }
})

// const obj = [{
//         id: 1,
//         title: 'First Task',
//         list: [
//             { id: new Date(), item: "..." }
//         ]
//     },
//     {
//         id: 2,
//         title: 'Important Chores',
//         list: [
//             { id: new Date(), item: "..." }
//         ]
//     },
//     {
//         id: 3,
//         title: 'Work Projects',
//         list: [
//             { id: new Date(), item: "..." }
//         ]
//     },
//     {
//         id: 4,
//         title: 'Family Time',
//         list: [
//             { id: new Date(), item: "..." }
//         ]
//     },
//     {
//         id: 5,
//         title: 'Fitness Goals',
//         list: [
//             { id: new Date(), item: "..." }
//         ]
//     }]

    // const loadDataFromLocalStorage = () => {
    //     const todoListsJSON = localStorage.getItem('todoLists');
    //     todoLists.value = JSON.parse(todoListsJSON) || [];
    //     console.log('Сработал стор', todoLists.value)
    // };

    // const saveDataToLocalStorage = () => {
    //     const todoListsJSON = JSON.stringify(todoLists.value);
    //     localStorage.setItem('todoLists', todoListsJSON);
        
    // };

    // watch(
    //     () => todoLists.value, 
    //     (data) => {
    //         saveDataToLocalStorage();
    //         console.log('WATCH!')
    //     }, {deep: true});
