<template>
    <div class="calendar-item" @click="day.overflow = !day.overflow"
    v-for="(day, index) in date" :key="index" :class="{ 'calendar-item2': isDateMatch(day?.day), 'calendar-item_overflowvisible': day?.overflow}" >
        <button  v-if="day?.day&&showButton" class="calendar-button"  @click="store.addCalendarMark(taskItems, day?.day), console.log(day?.day)">+</button>
        
        <span 
            class="calendar-text-date" 
            v-if="day" 
            >
                <button>{{ day.day.getDate() }}</button>
        </span>
            <div v-for="(task, index) in tasks" :key="task.id">
                <div 
                    v-if="day?.day && task.calendarMark === formatDay(day?.day)"
                    class="calendar-task"
                    :class="{ 
                    'calendar-task-before': controlDate(task.unformattedCalendarMark, day?.day)==true, 
                    'calendar-task-after': controlDate(task.unformattedCalendarMark, day?.day)==false, 
                    }"
                    @click="visibleFullTask(index), $router.push(`/taskpage/${task.id}`)"
                    >
                        {{ task.title }}
                </div>
            </div>
    </div>
</template>
<script>
import { useTasksStore } from '../../stores/TasksStore';
import {reactive, ref, onMounted} from 'vue'
export default {
    setup() {
        const store = useTasksStore()
        const tasks = reactive(useTasksStore().todoLists)
        const isOverflown = ref(false)

        const toggleOverflow = () => {
            isOverflown.value = !isOverflown.value
            console.log('overflown')
        }

        return {
            store,
            tasks,
            isOverflown,
            toggleOverflow,
        }
    },

    emits: ['addCalendarMark'],
    data() {
        return {
            objItem: '',
            calendarTaskVisible: null,
        }
    },
    props: {
        date: {
            type: Array,
        },
        taskItems: {
            type: Object,
        },
        showButton: {
            type: Boolean,
        }
    },
    methods: {




        getISODate() {
            const d = new Date();
            return d.toLocaleString().split(',')[0];
        },
        isDateMatch(day) {
            if (day instanceof Date) {
                const formatDay = day.toLocaleString().split(',')[0];
                const result = this.getISODate() === formatDay;
                return result;
            } else {
                console.log('Not a valid date object:', day);
                return false;
            }
        },
        formatDay(day) {
            return  day.toLocaleString().split(',')[0];
        },
        visibleFullTask(index){
            if(this.calendarTaskVisible !== index){
                this.calendarTaskVisible = index;
            } else {
                this.calendarTaskVisible = null;
            }
        },
        controlDate(taskDate, day) {
            const today = new Date();
            const taskDay = new Date(taskDate);
            taskDay.setHours(0, 0, 0, 0); // Обнуляем время
            today.setHours(0, 0, 0, 0); // Обнуляем время

            if (today.getTime() > taskDay.getTime()) {
                return true
            } else if (today.getTime() < taskDay.getTime()) {
                return false
            } else {
                return 
            }
        },
    },
}
</script>
<style scoped>
    .calendar-item {
        width: calc(100% / 7.5);
        box-shadow: 0px 0px 3px -1px orange;
        text-align: center;
        padding: 20px 3px 3px 3px;
        height: 70px; 
        transition: ease-in 0.2s;
        font-size: 12px;
        position: relative;
        word-break: break-word;
        border-radius: 5px;
        overflow: hidden;
    }
    .calendar-item_overflowvisible{
        overflow: visible;
    }
    .calendar-item2 {
        box-shadow: 0px 0px 2px 2px orange;
    }
    .calendar-item:hover {
        box-shadow:0px 0px 2px 1px orange;
    }
    .calendar-button {
        position: absolute;
        right: 3px;
        top: 3px;
        color: #e1b883;
        box-shadow: 0px 0px 3px 0px orange;
        border-radius: 100%;
        width: 14px;
        height: 14px;
        font-size: 14px;
        transition: ease-in 0.1s;
        line-height: 14px;
    }
    .calendar-button:hover {
        background: rgba(131, 131, 131, 0.649);
    }

    .calendar-text-date {
        position: absolute;
        left: 3px;
        top: 3px;
    }
    .calendar-task{
        font-size: 8px; 
        font-family: monospace;
        box-shadow: 0px 0px 2px 0px orange;
        width: 100%;
        cursor: pointer;
        background: darkorange;
        border-radius: 2px;
        color: #121910;
        margin-bottom: 1px;
        word-break: normal;
        overflow: hidden;
        padding: 0 2px;
        position: relative;
        z-index: 9999;
    }
    .calendar-task-before {
        background: orangered;
        box-shadow: 0px 0px 2px 0px #ff6700;
    }
    .calendar-task-after {
        background: rgb(79 145 219 / 66%);
        box-shadow: 0px 0px 2px 0px rgb(53 112 205 / 78%);
    }
    .calendar-task-full {
        overflow: auto;
        white-space: pre-wrap;
        overflow-wrap: break-word;
    }
</style>