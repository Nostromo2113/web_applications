<template>
    <div class="header-wrapper">
        <header class="header">
            <div class="container">
                <h1 class="logo">JOINT LIST</h1>
            </div>
            <search @search="searchGo" v-model="searchQuery" />
            <!--  -->
            <div class="select-wrapper">
                <my-select v-model="selectedSort" :options="sortOptions"></my-select>
            </div>
        </header>
    </div>
    <div class="container" style="margin:auto">

        <TasksList :tasks="sortedAndSearchedPosts" @removeTask="handleRemoveTask" @removeTaskElement="removeTaskElement"
            @redactionTaskElement="redactionTaskElement" @createTaskElement="createTaskElement"
            @addCalendarMark="addCalendarMark" />

        <!-- <loading-spinner v-else/> -->
        <!--  -->
    </div>
    <!--  -->
    <add-task @click="showModal" />
    <my-dialog v-model:show="dialogVisible">

        <add-form @create="createTasks" @close="dialogVisible = false" />
    </my-dialog>
    <!--  -->
</template>

<script>

import AddForm from '@/components/AddForm.vue'
import TaskItem from '@/components/TaskItem.vue'
import AddTask from '@/components/AddTask.vue'
import TasksList from '@/components/TasksList.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import Search from '@/components/Search.vue'
import Calendar from '@/components/calendar/Calendar.vue'


export default {
    components: {
        TaskItem, AddTask, TasksList,
        MyDialog, AddForm, Search, Calendar,
    },
    setup() {
        
    },
    data() {
        return {
            todoList: [],
            todoListArchived: [],
            dialogVisible: false,
            isTasksLoading: false,
            selectedSort: '',
            searchQuery: '',
            totalPages: 10,
            page: 1,
            limit: 10,
            sortOptions: [
                { value: 'date', name: 'Дата создания' },
                { value: 'calendarMark', name: 'Запись в календаре' },
            ]
        }
    },
    methods: {
        createTasks(task) {
            if (task.title !== "") {
                this.todoList.push(task)
                this.saveDataToLocalStorage()
            }
        },
        handleRemoveTask(taskId) {
            this.todoList = this.todoList.filter(task => task.id !== taskId)
            this.saveDataToLocalStorage()
        },
        showModal() {
            this.dialogVisible = true
        },
        searchGo(query) {
            this.searchQuery = query
            console.log(query)
        },
        check(obj) {
            console.log(obj)
        },
        createTaskElement(element, id) {
            this.todoList.forEach(el => {
                if (el.id === id) {
                    el.list.push(element)
                }
            })
            this.saveDataToLocalStorage()
        },
        redactionTaskElement(obj) {
            console.log('APP', obj)
            this.todoList.forEach(item => {
                item.list.forEach(el => {
                    if (el.id === obj.id) {
                        Object.assign(el, obj);
                    }
                });
            });
            this.saveDataToLocalStorage()
        },
        removeTaskElement(id) {
            this.todoList.forEach(item => {
                item.list = item.list.filter(el => el.id !== id);
            });
            this.saveDataToLocalStorage();
        },
        addCalendarMark(objItem) {
            this.todoList.forEach(item => {
                if (item.id === objItem.id) {
                    item = objItem
                };
            })
            this.saveDataToLocalStorage()
            console.log(this.todoList)
        },
        saveDataToLocalStorage() {
            const todoListJSON = JSON.stringify(this.todoList);

            localStorage.setItem('todoList', todoListJSON);
        },
        loadDataFromLocalStorage() {

            const todoListJSON = localStorage.getItem('todoList');

            this.todoList = JSON.parse(todoListJSON) || [];
        },
    },

    mounted() {
        this.loadDataFromLocalStorage();
    },
    computed: {
        sortedPosts() {
            console.log('TEST')
            return [...this.todoList].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        },
        
    }
}
</script>


<style>


.logo {
    text-align: center;
    padding: 5px 0 5px;
    font-weight: bold;
    font-size: 15px;
}

.header {
    padding: 5px 15px 0 15px;
    background-color: #f9fdfd;
    height: 110px;
    width: 100%;
    position: fixed;
    z-index: 99;
    opacity: 0.9;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}

.header-wrapper {
    height: 85px;
    margin-bottom: 30px;
}

.container {
    max-width: 500px;
    padding: 0 10px 0 10px;
}

.select-wrapper {
    margin: 0 0 5px 0;
    display: flex;
    justify-content: flex-end;
    margin: 5px 0;

}
</style>
<!-- RESET -->
<style>
/* RESET STYLES */
* {
    padding: 0px;
    margin: 0px;
    border: none;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

/* Links */

a,
a:link,
a:visited {
    text-decoration: none;
}

a:hover {
    text-decoration: none;
}

/* Common */

aside,
nav,
footer,
header,
section,
main {
    display: block;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
    font-size: inherit;
    font-weight: inherit;
}

ul,
ul li {
    list-style: none;
}

img {
    vertical-align: top;
}

img,
svg {
    max-width: 100%;
    height: auto;
}

address {
    font-style: normal;
}

/* Form */

input,
textarea,
button,
select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background-color: transparent;
}

input::-ms-clear {
    display: none;
}

button,
input[type="submit"] {
    display: inline-block;
    box-shadow: none;
    background-color: transparent;
    background: none;
    cursor: pointer;
}

input:focus,
input:active,
button:focus,
button:active {
    outline: none;
}

button::-moz-focus-inner {
    padding: 0;
    border: 0;
}

label {
    cursor: pointer;
}

legend {
    display: block;
}
</style>
