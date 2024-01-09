import {defineStore} from 'pinia';
import { 
    watch,
    ref,
    computed} from 'vue';

export const useTasksStore = defineStore ('tasksStore', () => {
    const todoLists = ref([]);
    const searchQuery = ref('');

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
                console.log(todoLists)
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
        console.log('storeDay',day)
            const formatDay = day.toLocaleString().split(',')[0];
            const unformattedCalendarMark = day;
            console.log('const',unformattedCalendarMark)
            todoLists.value.forEach(el => {
                if(el.id === taskItems.id) {
                    el.calendarMark = formatDay;
                    el.unformattedCalendarMark = day;
                    console.log(el.unformattedCalendarMark)
                }
            })
    };
    

    

    watch(() => todoLists, (state) => {
        localStorage.setItem('todoLists', JSON.stringify(state))
    }, {deep: true});

    const todoListsOnLocalStorage = localStorage.getItem('todoLists')
        if(todoListsOnLocalStorage){
            todoLists.value = (JSON.parse(todoListsOnLocalStorage))._value
        //UNDERLINE ИСПОЛЬЗУЕТСЯ ДЛЯ ПОЛУЧЕНИЯ РЕАЛЬНОГО ЗНАЧЕНИЯ ПЕРЕМЕННОЙ
    }

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
