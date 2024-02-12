<template>

    <div class="main-selector-wrapper">
        <div class="calendar-selector-wrapper">
                <button @click="switchMonth(-1)" class="selector"><i class="pi pi-angle-left"></i></button>
                <div class="month">{{ getMonthName(locale, month) }}</div>
                <button @click="switchMonth(+1)" class="selector"><i class="pi pi-angle-right"></i></button>
        </div>

        <div class="calendar-selector-wrapper">
                    <button class="selector"
                    @click="switchYear(-1)" ><i class="pi pi-angle-left"></i></button>
                    <span class="month">{{ getYear() }}</span>
                    <button 
                    class="selector"
                    @click="switchYear(+1)"><i class="pi pi-angle-right"></i></button>
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
<style lang="scss" scoped>

    .main-selector-wrapper {
        display: flex;
        font-size: clamp(0.813rem, 0.688rem + 0.5vw, 1rem);
        font-weight: 400;
    }
    .calendar-selector-wrapper {
        display: flex;
        align-items: center;
        width: 50%;

    }
    .selector {
        width: calc(100%/3);
    }
    
    .selector:hover {
        text-shadow: 0px 0px 4px $turquoise;
    }

    .month {
        text-align: center;
        min-width: calc(100%/3);
    }
</style>