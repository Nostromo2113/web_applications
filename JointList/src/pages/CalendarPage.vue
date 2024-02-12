<template>
    <div class="calendar-page-wrapper container">
        <calendar 
            class="calendar"
            :tasks="tasks"
            :title="'123'"
            @getClickDay="writeClickDayToStore"
        />
            <calendar-task-viewer
            class="calendar-task-viewer"
            :clickDay="day">
                <transition-group v-if="supabaseStore.tasksLoader" name="list">
                    <task-item v-if="todoListCalendarFiltred.length > 0" 
                    v-for="task in todoListCalendarFiltred"
                    :taskItem="task" 
                    :key="task.id"
                    />
                    <h1 class="title" v-else>Списков на данную дату нет</h1>
                </transition-group>
                <loader v-else/>
            </calendar-task-viewer> 
                
    </div>
</template>
<script>
import Calendar from '../components/calendar/Calendar.vue';
import { useTasksStore } from '../stores/TasksStore';
import { useSupabaseStore } from '@/stores/SupabaseStore';
import {
    ref, computed
} from 'vue'
export default {
    components: {
        Calendar
    },
    setup() {
        const tasksStore = useTasksStore();
        const supabaseStore = useSupabaseStore();
        const tasks = ref(computed(() => useTasksStore().todoLists));
        const day = ref(tasksStore.clickDay);
        const todoListCalendarFiltred = ref(computed(() => tasksStore.todoListsCalendarFiltred));  
        console.log(todoListCalendarFiltred.value)

        const addCalendarMark = (taskItems) => {
            console.log('JOB')
            tasksStore.addCalendarMark(taskItems);
        };
        const writeClickDayToStore = (date, dialog) => {
            console.log('write', date, dialog)
            if (!dialog) {
                tasksStore.getTasksForToday(date);
            }
                tasksStore.writeClickDay(date, dialog);
        };

    return {
        supabaseStore,
        tasks,
        todoListCalendarFiltred,
        tasksStore,
        day,
        addCalendarMark,
        writeClickDayToStore,
    }
    }
}
</script>
<style lang="scss" scoped>
    .calendar {
        margin-bottom: 30px;
    }
    .calendar-page-wrapper {
        margin-top: 20px;
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
    }
}



/* TRANSITION */

    .list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.list-move {
  transition: transform 0.5s ease;
}
.empty-list {
  font-size: $font-size-main_title;
  color: $turquoise;
  text-align: center;
  margin: auto;
  margin-top: 15%;
}
/* TRANSITION */
</style>