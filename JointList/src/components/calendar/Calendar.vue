<template>
    <div class="container" :class="dialog ? 'container-dialog' : ''">
        <calendar-selector class="calendar-selector"
            :locale="locale" 
            :month="month" 
            @switchMonth="applyDate" 
            @switchYear="applyDate" />
        <div class="calendar-wrapper">
            <calendar-item  
                @getClickDay="getClickDay"
                :tasks="tasks"
                :week="week"
                :date="days"
                :dialog="dialog"
                :title="title"
                :calendarListOverflow="calendarListOverflow"
                >
            </calendar-item>
        </div>
        <button 
            class="btn-add-calendar" 
            v-if="dialog"
            @click="clickOkBtn"
            
        >
            OK
        </button>
    </div>
</template>
<!-- В нижней части компонента будет описание пропсов -->
<script>
import CalendarSelector from "@/components/calendar/CalendarSelector.vue";
import CalendarItem from "@/components/calendar/CalendarItem.vue";
import { defineAsyncComponent, ref, watch, computed} from 'vue';


export default {
    emits: ['addCalendarMark', 'closeDialog', 'getClickDay'],
    components: {
        CalendarSelector,
        CalendarItem,

        "TaskItem": defineAsyncComponent(() => import('../blocks/TaskItem.vue'))
    },
    props: {
        taskItem: {
            type: Object,
        },

        dialog: {
            type: Boolean,
            default: false,
        },
        calendarListOverflow: {
            type: Object,
        },
        tasks: {
            type: Array,
            default: [],
        },
        title: {
            type: String,
            default: 'title',
        }
        
    },
    setup(props, {emit}) {
        const locale = ref('en-EN');
        const currentDay = ref(new Date());
        const week = ref([]);
        const monthNames = ref([]);
        const days = ref([]);
        const month = ref(null);
        const year = ref(null);
        const daysIsMonth = ref(null);
        const firstDayIndex = ref(null);
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


        const getClickDay = (date, dialog) => {
            emit('getClickDay', date, dialog)
        };

        const clickOkBtn = () => {
            emit('clickOkBtn');
            emit('closeDialog');
        }

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
            clickDay,
            clickOkBtn,
            applyDate,
            getClickDay,
        };
    }
};
</script>
<!-- props:
    1. taskItem: Передаем один таск для записи задачи на дату в режиме диалогового окна, т.е. открыли календарь, и сразу передали в виде аргумента нужный объект. 
    2. dialog: если dialog = true, то календарь будет работать в режиме диалогового окна. Так же отрисуется кнопка 'OK'
    3. calendarListOverfown: если calendarListOverfown = true, отображаемые заголовки на дате календаря не помещаются в поле. Отрисовывает кнопка раскрытия списка.
    4. tasks: передаем список задач для отрисовки на датах календаря в виде массива.

    emits: 
    1. getClickDay(date, dialog): получаем дату по клику на дату календаря и полученный ранее пропс dialog(default: false). Если будет необходима проверка и разрешение записи даты 
    в формате диалогового окна;
-->
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