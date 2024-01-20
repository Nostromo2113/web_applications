<template>
    <div>
        <calendar 
            class="calendar"
        />
            <calendar-task-viewer @click="console.log(calendarListOverflow)" 
            :clickDay="day">
                <task-item 
                v-for="task in todoListCalendarFiltred"
                :taskItems="task" 
                :key="task.id"
                />
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
</style>