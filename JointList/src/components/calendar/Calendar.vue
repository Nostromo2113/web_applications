<template>
    <div class="container"  :class="showButton ? 'container-dialog' : ''">
        <calendar-selector 
            :locale="locale" :month="month" 
            @switchMonth="applyDate"
            @switchYear="applyDate"
        />
        <div class="calendar-wrapper">
            <div class="calendar-item" 
            v-for="item in week" 
            :key="item">
            {{ item }}
            </div>
            <calendar-item 
                :showButton="showButton" 
                :taskItems="taskItems" 
                :date="days" >
            </calendar-item>
        </div>
    </div>
</template>

<script>
import CalendarSelector from "@/components/calendar/CalendarSelector.vue"
import CalendarItem from "@/components/calendar/CalendarItem.vue"

export default {
    components: {
        CalendarSelector, CalendarItem,
    },
    props:{
        taskItems: {
            type: Object,
        },
        showButton: {
            type: Boolean,
        }
    },
    data() {
        return {
            locale: 'ru-RU',
            currentDay: new Date(),
            week: [],
            monthNames: [],
            days: [],
            month: null,
            year: null,
            daysIsMonth: null,
            firstDayIndex: null,
        }
    },
    methods: {
        applyDate(date) {
            this.currentDay = date;
            this.days = [];
        },
        getDayOfMonth(month, year) {
            this.daysIsMonth = new Date(year, month + 1, 0).getDate();
        },
        getFirstWeekday(month, year) {
            this.firstDayIndex = new Date(year, month, 1).getUTCDay();
        },
        getDayWeek() {
            console.log('day до удаления', this.days)
            this.days = [];
            console.log('thisdays', this.days)
            for (let i = this.firstDayIndex; i < this.daysIsMonth + this.firstDayIndex; i++) {
                this.days[i] = {
                    day: new Date(this.year, this.month, i + 1 - this.firstDayIndex),
                    overflow: false
                };
            }
            console.log('result',this.days)
        },
        getWeekDayName(locale) {
            const dayNames = [];
            for (let i = 1; i <= 7; i++) {
                const day = new Date(2023, 0, i + 1).toLocaleDateString(locale, { weekday: 'short' });
                dayNames.push(day);
    }
            this.week = dayNames;
        },
        changeLanguage() {
            if(this.locale === "ru-RU"){
                this.locale = "en-EN"
                return "EN"
            } else {
                this.locale = "ru-RU"
                return "RU"
            }
        },
        
    },
    watch: {
        currentDay: {
            immediate: true,
            handler(){
            this.month = this.currentDay.getMonth();
            this.year = this.currentDay.getFullYear();
            this.getDayOfMonth(this.month, this.year);
            this.getFirstWeekday(this.month, this.year);
            this.days = [];
            this.getDayWeek();
            this.getWeekDayName(this.locale);
            }
        },
        locale: {
            immediate: true, 
            handler() {
                this.getWeekDayName(this.locale);
            }
        }
    },

}
</script>

<style scoped>
.container {
    width: 100%;
    margin: auto;
    text-transform: uppercase;
    padding: 0 15px;
    font-weight: bold;
    color: #e1b883;
    
}
.container-dialog {
    padding: 0;
}
.calendar-wrapper {
    display: flex;
    width: 108%;
    flex-wrap: wrap;
    height: 400px;
}

.calendar-item {
    width: calc(100% / 7.5);
    text-align: center;
    padding: 10px;
    height: 50px;
    font-size: 10px; 
    border-radius: 5px;
}
</style>