<template>
<div class="header-wrapper">
    <header class="header">
        <div class="container">
            <div class="list-form-wrapper">
                <my-input class="search" v-model="query" :is="3" :placeholderText="'Search...'"/>
                <component 
                :is="currentComponent"
                :class="{'form': currentComponent == 'add-form'}"
                >
                +
                </component>
                <!-- <div class="select-wrapper"> -->
                    <!-- <my-select v-model="selectedSort" :options="sortOptions"></my-select> -->
                <!-- </div> -->
            </div>
        </div>
    </header>
</div>
<div class="container" style="margin:auto">
    <tasks-list @addCalendarMark="addCalendarMark" />
    <component  
    v-if="currentComponent=='button-add'"
    @showModal="showModal"
    :is="currentComponent"
    :class="{
        'form': currentComponent == 'button-add'
    }"
    >+</component>
</div>

<my-dialog 
    v-model:show="dialogVisible">
    <add-form v-focus 
    @close="dialogVisible = false" />
</my-dialog>
</template>

<script>
import {
    ref,
    reactive,
    onMounted,
    onBeforeUnmount,
    computed,
    watch,
} from 'vue';

import { useTasksStore } from '../stores/TasksStore';

export default {
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


        // Adaptability
        const screenWidth = ref(window.innerWidth);
        const currentComponent = ref('button-add');

        const handleResize = () => {
            screenWidth.value = window.innerWidth;
        };
         onMounted(() => {
            window.addEventListener('resize', handleResize);
            updateComponent();
        });
        onBeforeUnmount(() => {
            window.removeEventListener('resize', handleResize);
        });
        const updateComponent = () => {
            if (screenWidth.value >= 768) {
                currentComponent.value = 'add-form';
            } else {
                currentComponent.value = 'button-add';
            }
        };

        watch(screenWidth, (newWidth) => {
            if (newWidth >= 768) {
                currentComponent.value = 'add-form';
            } else {
                currentComponent.value = 'button-add';
            }
        });

        return {
            query,
            todoList,
            dialogVisible,
            selectedSort,
            sortOptions,
            showModal,
            searchGo,
            addCalendarMark,
            
            // Adaptability
            currentComponent,
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
    padding: 0px 15px;
    padding-top: clamp(0rem, -0.833rem + 3.33vw, 1.25rem);
    width: 100%;
    margin: 18px 0;
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


 /* Adaptability */
.list-form-wrapper {
    display: flex;
    gap: 56px;
}

.form {
    width: 100%;
}
</style>


