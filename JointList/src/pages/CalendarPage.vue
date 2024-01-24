<template>
    <div class="calendar-page-wrapper container">
        <calendar 
            class="calendar"
        />
            <calendar-task-viewer
            class="calendar-task-viewer"
            :clickDay="day">
                <task-item v-if="todoListCalendarFiltred.length > 0" 
                v-for="task in todoListCalendarFiltred"
                :taskItems="task" 
                :key="task.id"
                />
                <h1 class="title" v-else>Списков на данную дату нет</h1>
                </calendar-task-viewer> 
    </div>
</template>
<script>
import Calendar from '../components/calendar/Calendar.vue';
import { useTasksStore } from '../stores/TasksStore';
import {
    ref, computed
} from 'vue'
export default {
    components: {
        Calendar
    },
    setup() {
        const store = useTasksStore()
        const todoList = ref(useTasksStore().todoLists)
        const day = ref(computed(()=>new Date(store.clickDay)))
        const todoListCalendarFiltred = ref(computed(() => store.todoListsCalendarFiltred))  

        
    return {
        todoList,
        todoListCalendarFiltred,
        store,
        day,
    }
    }
}
</script>
<style scoped>
    .calendar {
        margin-bottom: 30px;
    }

    @media (min-width: 980px) {
    .calendar-page-wrapper {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-template-rows: auto;
        margin-top: 50px;
    }
    .calendar {
        grid-column: 1;
        margin-top: 0;
    }
    .calendar-task-viewer {
        grid-column: 2;
        width: 100%;
        background: black;
    }
}

</style>