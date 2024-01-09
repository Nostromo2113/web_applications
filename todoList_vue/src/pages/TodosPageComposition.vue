<template>
<div class="header-wrapper">
    <header class="header">
        <div class="container">
            <my-input v-model="query" :is="3" :placeholderText3="'Поиск...'"/>
            <div class="select-wrapper">
                <my-select v-model="selectedSort" :options="sortOptions"></my-select>
            </div>
        </div>
    </header>
</div>
<div class="container" style="margin:auto">
    <tasks-list @addCalendarMark="addCalendarMark" />
    <add-task @click="showModal" />
</div>

<my-dialog 
    v-model:show="dialogVisible">
    <add-form 
    @close="dialogVisible = false" />
</my-dialog>
</template>

<script>
import {
    ref,
    reactive,
    onMounted,
    computed
} from 'vue';

import { useTasksStore } from '../stores/TasksStore';

import AddForm from '@/components/AddForm.vue';
import TaskItem from '@/components/TaskItem.vue';
import AddTask from '@/components/AddTask.vue';
import TasksList from '@/components/TasksList.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import Search from '@/components/Search.vue';
import Calendar from '@/components/calendar/Calendar.vue';

export default {
    components: {
        TaskItem,
        AddTask,
        TasksList,
        MyDialog,
        AddForm,
        Search,
        Calendar,
    },
    setup() {

        const store = useTasksStore();
        const todoList = reactive(store.todoLists);
        const dialogVisible = ref(false);
        const selectedSort = ref('');
        const sortOptions = [{
                value: 'date',
                name: 'Дата создания'
            },
            {
                value: 'calendarMark',
                name: 'Запись в календаре'
            },
            {
                value: '',
                name: 'Только сегодня'
            },
        ];
        const query = computed({
            get: () => store.searchQuery,
            set: (value) => {
                store.updateSearchQuery(value)
            }
        });

        const showModal = () => {
            dialogVisible.value = true;
        };

        const searchGo = (query) => {
            store.searchQuery = query;
            console.log(searchQuery.value);
        };

        const addCalendarMark = (objItem) => {
            todoList.value.forEach((item) => {
                if (item.id === objItem.id) {
                    item = objItem;
                }
            });
            console.log(todoList.value);
        };
        onMounted(()=> {
        })
        return {
            query,
            todoList,
            dialogVisible,
            selectedSort,
            sortOptions,
            showModal,
            searchGo,
            addCalendarMark,
        };
    },
};
</script>

<style>
.logo {
    text-align: center;
    padding: 5px 0 5px;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
}

.header {
    padding: 5px 15px 0 15px;
    height: 100px;
    width: 100%;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}

.header-wrapper {
    height: 85px;
    margin-bottom: 30px;
}

.container {
    max-width: 1000px;
    padding: 10px;
    margin: auto;
}

.select-wrapper {
    margin: 0 0 5px 0;
    display: flex;
    justify-content: flex-end;
    margin: 5px 0;
}
select option {
    color: white;
    background-color: rgb(28,28,28, 0.8);
}
</style>

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
