import {defineStore} from 'pinia';
import {reactive, watch, onMounted, ref} from 'vue';

export const useTasksStore = defineStore ('tasksStore', () => {
    const todoLists = ref([]);

    const todoListsOnLocalStorage = localStorage.getItem('todoLists')
        if(todoListsOnLocalStorage){
            todoLists.value = (JSON.parse(todoListsOnLocalStorage))._value
            console.log('...',todoLists, '.....')
        }

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

    watch(() => todoLists, (state) => {
        localStorage.setItem('todoLists', JSON.stringify(state))
    }, {deep: true})

    return {
        todoLists,
        deleteTask,
        redactionTaskElement,
        createTasksElement,
        removeTasksElement,
        createTasks,
    }
})