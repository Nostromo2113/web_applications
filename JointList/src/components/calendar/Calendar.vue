<template>
    <div class="container" :class="showButton ? 'container-dialog' : ''">
        <calendar-selector :locale="locale" :month="month" @switchMonth="applyDate" @switchYear="applyDate" />
        <div class="calendar-wrapper">
            <div class="calendar-item" v-for="item in week" :key="item">
                {{ item }}
            </div>
            <calendar-item 
                @getTasksForToday="getTasksForToday" 
                @getOverflownBtnVisible="getOverflownBtnVisible"
                :showButton="showButton" 
                :taskItems="taskItems"
                :date="days">
            </calendar-item>
        </div>
    </div>
</template>

<script>
import CalendarSelector from "@/components/calendar/CalendarSelector.vue";
import CalendarItem from "@/components/calendar/CalendarItem.vue";
import { defineAsyncComponent, ref, watch} from 'vue';


export default {
    components: {
        CalendarSelector,
        CalendarItem,

        "TaskItem": defineAsyncComponent(() => import('../taskitem.vue'))
    },
    props: {
        taskItems: {
            type: Object,
        },
        showButton: {
            type: Boolean,
        }
    },
    setup(props) {
        const locale = ref('ru-RU');
        const currentDay = ref(new Date());
        const week = ref([]);
        const monthNames = ref([]);
        const days = ref([]);
        const month = ref(null);
        const year = ref(null);
        const daysIsMonth = ref(null);
        const firstDayIndex = ref(null);
        const todoList = ref([]);
        const clickDay = ref(new Date());

        const applyDate = (date) => {
            currentDay.value = date;
            days.value = [];
        };

        const getTasksForToday = (tasks, day) => {
            if(tasks)
            todoList.value = tasks;
            console.log('checkTasks', todoList)
            clickDay.value = day;
            console.log('clickday',clickDay.value)
        };
        
        const getOverflownBtnVisible = (dayFullObj) => {
            
            console.log('dayFullObj',dayFullObj.value?.day)
        }

        const getDayOfMonth = (month, year) => {
            daysIsMonth.value = new Date(year, month + 1, 0).getDate();
        };

        const getFirstWeekday = (month, year) => {
            firstDayIndex.value = new Date(year, month, 1).getUTCDay();
        };

        const getDayWeek = () => {
            days.value = [];
            for (let i = firstDayIndex.value; i < daysIsMonth.value + firstDayIndex.value; i++) {
                days.value[i] = {
                    day: new Date(year.value, month.value, i + 1 - firstDayIndex.value),
                    overflowBtn: false,
                    overflown: false,
                };
            }
        };

        const getWeekDayName = (locale) => {
            const dayNames = [];
            for (let i = 1; i <= 7; i++) {
                const day = new Date(2023, 0, i + 1).toLocaleDateString(locale, { weekday: 'short' });
                dayNames.push(day);
            }
            week.value = dayNames;
        };

        watch([currentDay, locale], ([newCurrentDay, newLocale]) => {
            month.value = newCurrentDay.getMonth();
            year.value = newCurrentDay.getFullYear();
            getDayOfMonth(month.value, year.value);
            getFirstWeekday(month.value, year.value);
            days.value = [];
            getDayWeek();
            getWeekDayName(newLocale);
        }, { immediate: true });

        return {
            locale,
            currentDay,
            week,
            monthNames,
            days,
            month,
            year,
            daysIsMonth,
            firstDayIndex,
            todoList,
            clickDay,
            applyDate,
            getTasksForToday,
            getOverflownBtnVisible,
        };
    }
};
</script>
<style scoped>
.container {
    width: 100%;
    margin: auto;
    text-transform: uppercase;
    padding: 0 15px;
    font-weight: bold;
    color: #e1b883;
    font-family: monospace;
    
}
.container-dialog {
    padding: 0;
}
.calendar-wrapper {
    display: flex;
    width: 108%;
    flex-wrap: wrap;
    margin-bottom: 30px;
}

.calendar-item {
    width: calc(100% / 7.5);
    text-align: center;
    padding: 10px;
    height: 50px;
    font-size: 12px; 
    border-radius: 5px;
}
</style>