<template>
        <div 
        @click="getClickDay(day.day, dialog)"
        v-for="(day, index) in date" 
        :key="index" 
            :class="{
                'calendar-item': day?.day,
                'calendar-item-today': isDateMatch(day?.day), 
                'calendar-item_overflowvisible':dayOverflow && new Date(day?.day).setHours(0,0,0,0) == new Date(store.clickDay).setHours(0,0,0,0), 
                'calendar-item-click': new Date(day?.day).getTime() == new Date(clickDay).getTime()
                }" 
                >
            <button-item 
                class="calendar-button"
                v-if="hasOverflowingTasks(day?.day)&&!dialog"
                @click="dayOverflow = !dayOverflow"
            >
            ↓
            </button-item>
            <span 
                class="calendar-text-date" 
                v-if="day" 
                >
                    {{ day.day.getDate() }}
            </span>
                <div v-for="task in tasks" :key="task.id">
                    <div 
                        v-if="day?.day && !dialog && task.calendarMark === formatDay(day?.day)"
                
                        :class="{ 
                        'calendar-task':true,
                        'calendar-task-before': controlDate(task.unformattedCalendarMark, day?.day)==true, 
                        'calendar-task-after': controlDate(task.unformattedCalendarMark, day?.day)==false, 
                        }"
                        >
                            {{ task.title }}
                    </div>
                </div>
        </div>
</template>
<script>
import { useTasksStore } from '../../stores/TasksStore';
import { computed, ref} from 'vue';

export default {
        props: {
            date: {
                type: Array,
            },
            dialog: {
                type: Boolean,
                default: false,
            },
            calendarListOverflow: {
                type: Object,
            }
    },
    setup(props) {
        const store = useTasksStore();
        const tasks = ref(computed(() => store.sortedAndSearchedPosts()));
        const isOverflown = ref(false);
        const dayDate = ref(null);
        const dayObj = ref({});
        const selectedDate = ref(new Date())
        const dialog = ref(props.dialog)
        const dayOverflow = ref(false);
        const activeDay = ref(new Date());

        const clickDay = computed(() => {
            if (dialog.value) {
                return store.clickDayDialog;
            } else {
                return store.clickDay;
            }
        });

        const getTasksForDate = (date) => {
        return tasks.value.filter(task => {
            return new Date(task.unformattedCalendarMark).setHours(0,0,0,0) === new Date(date).setHours(0,0,0,0);
        });
        };

        const hasOverflowingTasks = (date) => {
            activeDay.value = new Date(date)
            return getTasksForDate(date).length > 4;
        };

        
        const toggleOverflow = () => {
            isOverflown.value = !isOverflown.value;
        };

        const getISODate = () => {
            const d = new Date();
            return d.toLocaleString().split(',')[0];
        };

        const isDateMatch = (day) => {
            if (day instanceof Date) {
                const formatDay = day.toLocaleString().split(',')[0];
                return getISODate() === formatDay;
            } else {
                return false;
            }
        };

        const formatDay = (day) => {
            return day.toLocaleString().split(',')[0];
        };

        const visibleFullTask = (index) => {
            props.calendarTaskVisible = (props.calendarTaskVisible !== index) ? index : null;
        };

        const controlDate = (taskDate, day) => {
            const today = new Date();
            const taskDay = new Date(taskDate);
            taskDay.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

                if (today.getTime() > taskDay.getTime()) {
                    return true;
                } else if (today.getTime() < taskDay.getTime()) {
                    return false;
                } else {
                    return;
                }
        };

        const getClickDay = (day, dialog) => {
                store.getClickDay(day, dialog)
            }

        return {
            activeDay,
            dialog,
            store,
            tasks,
            isOverflown,
            dayDate,
            dayObj,
            clickDay,
            selectedDate,
            dayOverflow,
            toggleOverflow,
            getISODate,
            isDateMatch,
            formatDay,
            visibleFullTask,
            controlDate,
            getClickDay,
            getTasksForDate,
            hasOverflowingTasks,

        };
    }
};
</script>
<style lang="scss" scoped>
    .calendar-item {
        box-shadow: 0px 0px 1px 0px orange;
        text-align: center;
        padding: 22px 3px 3px 3px;
        height: 64px; 
        transition: ease-in 0.2s;
        position: relative;
        word-break: break-word;
        border-radius: 5px;
        overflow: hidden;
    }
    .calendar-item_overflowvisible {
    overflow: visible;
}
    .calendar-item-today {
        color: orange;
    }

    .calendar-item-click{
        box-shadow: 0px 0px 3px 2px orange;
    }
    .calendar-item:hover {
        box-shadow:0px 0px 3px 2px orange;
    }
    .calendar-button {
        position: absolute;
        right: 0;
        top: 0px;
        color: #e1b883;
        font-size: 14px;
    }

    .calendar-text-date {
        position: absolute;
        left: 3px;
        top: 3px;
        font-size: clamp(0.813rem, 0.688rem + 0.5vw, 1rem);
    }
    .calendar-task{
        font-size: clamp(0.45rem, 0.354rem + 0.38vw, 0.594rem); 
        box-shadow: 0px 0px 2px 0px orange;
        background: darkorange;
        border-radius: 2px;
        color: #121910;
        margin-bottom: 1px;
        padding: 0 2px;
        position: relative;
        z-index: 9;
        text-shadow: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

    }
    .calendar-task-before {
        background: orangered;
        box-shadow: 0px 0px 2px 0px #ff6700;
    }
    .calendar-task-after {
        background: rgb(79 145 219 / 66%);
        box-shadow: 0px 0px 2px 0px rgb(53 112 205 / 78%);
    }


    @media (min-width: 768px) {
        .calendar-item {
            height: 80px;
        }
}
</style>