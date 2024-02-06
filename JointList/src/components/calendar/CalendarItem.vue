<template>
        <div 
        class="calendar-item week" 
        v-for="item in week" 
        :key="item">
                    {{ item }}
        </div>
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
            week: {
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
        text-align: center;
        padding: 24px 3px 3px 3px;
        height: 64px; 
        transition: ease-in 0.2s;
        position: relative;
        word-break: break-word;
        overflow: hidden;
        cursor: pointer;
    }
    .week {
        height: 70px;
        text-shadow: none;
        font-size: $font-size-big-normal;
        box-shadow: 0 2px 2px -2px silver;
    }
    .calendar-item_overflowvisible {
    overflow: visible;
}
    .calendar-item-today {
        color: $turquoise;
    }

    .calendar-item-click{
        box-shadow: 0px 0px 2px 2px silver;
        border-radius: 5px;
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
        font-size: $font-size-title;
    }
    .calendar-task{
        font-size: $font-size-mini; 
        background: $turquoise;
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
        font-weight: bold;

    }
    .calendar-task-before {
        background: $violetblue;
    }
    .calendar-task-after {
        background: $violet;
    }


    @media (min-width: 768px) {
        .calendar-item {
            height: 80px;
        }
}
</style>