import {defineStore} from 'pinia';

import { 
    ref,
    onMounted,
    watch,
} from 'vue';

export const useTasksStore = defineStore ('tasksStore', () => {

    const todoLists = ref([]); 
    const todoListsCalendarFiltred = ref([]);
    const searchQuery = ref('');


    //Get click day on calendar
    const clickDay = ref(new Date);
    const clickDayDialog = ref( new Date);

    const writeClickDay = (day, dialog) => {
        if(!dialog) {
            clickDay.value = day;
        }else {
            clickDayDialog.value = day;
        }
    };

    const getTasksForToday = (clickDay) => {  
        todoListsCalendarFiltred.value = todoLists.value.filter(
        (task) => new Date(task.unformattedCalendarMark).setHours(0, 0, 0, 0) === new Date(clickDay).setHours(0, 0, 0, 0)
        );
    };


////
    const updateSearchQuery = (value) => {
        searchQuery.value = value;
    };

    const writeArray = (array) => {
        todoLists.value = array;
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
    const addCalendarMark = (taskItems) => {
        console.log('ADD')
            const formatDay = clickDayDialog.value.toLocaleString().split(',')[0];
            todoLists.value.forEach(el => {
                if(el.id === taskItems.id) {
                    el.calendarMark = formatDay;
                    el.unformattedCalendarMark = clickDayDialog.value;
                }
            })
    };

    watch([clickDay, todoLists], ([newValue1, newValue2], [oldValue1, oldValue2]) => {
        getTasksForToday(clickDay.value)
    },{deep: true, immediate: true});

    return {
        todoLists,
        todoListsCalendarFiltred,
        searchQuery,
        clickDay,
        writeClickDay,
        sortedPosts,
        sortedAndSearchedPosts,
        deleteTask,
        redactionTaskElement,
        createTasksElement,
        removeTasksElement,
        createTasks,
        updateSearchQuery,
        addCalendarMark,
        writeArray,
        getTasksForToday,
    }
})