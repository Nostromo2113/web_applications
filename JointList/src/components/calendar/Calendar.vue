<template>
    <div class="container" :class="dialog ? 'container-dialog' : ''">
        <calendar-selector class="calendar-selector"
            :locale="locale" 
            :month="month" 
            @switchMonth="applyDate" 
            @switchYear="applyDate" />
        <div class="calendar-wrapper">
            <calendar-item  
                :week="week"
                :date="days"
                :dialog="dialog"
                :calendarListOverflow="calendarListOverflow"
                >
            </calendar-item>
        </div>
        <default-btn 
            class="btn-add-calendar" 
            v-if="dialog"
            @click="store.addCalendarMark(taskItems, store.clickDayDialog), $emit('closeDialog')"
            
        >
            OK
        </default-btn>
    </div>
</template>

<script>
import CalendarSelector from "@/components/calendar/CalendarSelector.vue";
import CalendarItem from "@/components/calendar/CalendarItem.vue";
import { useTasksStore } from "../../stores/TasksStore";
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

        dialog: {
            type: Boolean,
            default: false,
        },
        calendarListOverflow: {
            type: Object,
        }
    },
    setup(props) {
        const store = ref(useTasksStore())

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
            store,
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
        };
    }
};
</script>
<style lang="scss" scoped>
.container {
    width: 100%;
    margin: auto;
    text-transform: uppercase;
    padding: 0 15px;
    color: var(--font-main-color);
    font-family: monospace;
    
}
.container-dialog {
    padding: 0;
}
.calendar-wrapper {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    width: 100%;
    flex-wrap: wrap;
    gap: 3px;
}

.calendar-selector {
    margin-bottom: 20px;
}

.calendar-item {
    text-align: center;
    padding: 10px;
    height: 35px;
    font-size: $font-size-title; 
    border-radius: 5px;
}

.btn-add-calendar {
    float: right;
    font-size: 16px;
}
</style>