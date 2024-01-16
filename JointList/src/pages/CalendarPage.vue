<template>
    <div @click="console.log('DAYMAIN', day)">
        <calendar></calendar>
                <calendar-task-viewer @click="console.log(day)" v-if="!showButton" :clickDay="day">
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
import {ref, computed, watch, onMounted} from 'vue'
export default {
    components: {
        Calendar
    },
    setup() {
        const store = useTasksStore()
        const todoList = ref(useTasksStore().todoLists)
        const day = ref(computed(()=>new Date(store.clickDay)))
        // const todoListCalendarFiltred = ref([])
        
        const todoListCalendarFiltred = ref(computed(() => 
        todoList.value.filter(
                (task) => new Date(task.unformattedCalendarMark).setHours(0, 0, 0, 0) === day.value.setHours(0, 0, 0, 0)
            ))
        )
    

        // const getFiltredTodolists = (day) => {
        //     console.log('Проверка функции', day)
        //     todoListCalendarFiltred.value = todoList.value.filter(
        //         (task) => new Date(task.unformattedCalendarMark).setHours(0, 0, 0, 0) === day.value.setHours(0, 0, 0, 0))
        //         console.log('array',todoListCalendarFiltred)
        // }

        watch(day, (date) => {
            day.value = new Date(date)
           // getFiltredTodolists(day)
            console.log('watchPAGE',day.value)
        }, { deep: true })

        onMounted(() => {
           // getFiltredTodolists(day)
        })
    return {
        todoList,
        todoListCalendarFiltred,
        store,
        day,
        //getFiltredTodolists,
    }
    }
}
</script>
<style lang="">
    
</style>