<template>

    <div class="main-selector-wrapper">
        <div class="calendar-selector-wrapper">
                <button @click="switchMonth(-1)" class="selector">&lt;</button>
                <div class="month">{{ getMonthName(locale, month) }}</div>
                <button @click="switchMonth(+1)" class="selector">&gt;</button>
        </div>

        <div class="calendar-selector-wrapper">
                    <button @click="switchYear(-1)" class="selector">&lt;</button>
                    <span class="month">{{ getYear() }}</span>
                    <button @click="switchYear(+1)" class="selector">&gt;</button>
        </div>
    </div>    

</template>

<script>
export default {
    data () {
        return {
            date: new Date(),
            monthName: '',
            yearName: '',
        }
    },
    props: {
        month:{
            type: [Number, String],
            default: 'Месяц',
        },
        locale:{
            type: String,
        }
    },
    methods: {
        switchMonth(num) {
        const date = new Date(this.date);
        date.setMonth(this.date.getMonth() + num);
        console.log(this.date)
        this.date = date;
        console.log('Проверка даты после присвоения',date)
        this.$emit('switchMonth', this.date);
        },
        switchYear(num) {
            const date = new Date(this.date);
            date.setFullYear(date.getFullYear() + num);
            this.date = date;
            this.$emit('switchYear', this.date);
        },
        getMonthName(locale, index) {
            const d = new Date(2020, index, 1);
            return d.toLocaleDateString(locale, { month: 'long' });
        },
        getYear() {
            return this.date.getFullYear();
        },
    },

    mounted() {
        this.monthName = this.getMonthName(this.locale, this.month); 
    },
}
</script>
<style scoped>

    .main-selector-wrapper {
        display: flex;
    }
    .calendar-selector-wrapper {
        display: flex;
        height: 20px;
        margin: 20px;
        width: 50%;
    }
    .selector {
        width: 15%;
        transition: ease-in 0.2s;
    }
    .selector:hover {
        text-shadow: 0px 2px 4px rgb(20 20 20 / 46%);
    }

    .month {
        display: inline-block;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        width: 100%;
        font-size: 10px;
        line-height: 20px;
    }
</style>