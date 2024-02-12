<template>
    <div @click="console.log(task)">
        <span 
        class="date"
            :class="{
                'date-after': controlDate(task) == 1,
                'date-before': controlDate(task) == 2,
                'date-today': controlDate(task) == 3,
            }"
        ><slot></slot></span>
    </div>
</template>
<script>
export default {
    name: 'time-visible',
    props: {
        task: {
            type: Object,
        }
    },
    setup() {
            const controlDate = (taskDate) => {
            if (taskDate) {
                const today = new Date();
                const taskDay = new Date(taskDate.unformattedCalendarMark);
                taskDay.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);

                if (today.getTime() > taskDay.getTime()) {
                    return 1
                } else if (today.getTime() < taskDay.getTime()) {
                    return 2
                } else if (today.getTime() === taskDay.getTime()){
                    return 3
                } else {
                    return
                }
            }
        };
        return {
            controlDate,
        }
    }
}
</script>
<style lang="scss" scoped>
    .date {
        font-size: $font-size-normal;
        font-weight: bold;
    }

    .date-after {
        color: $violetblue;
    }

    .date-before {
        color: $violet;
    }

    .date-today {
        color: $turquoise;
    }
</style>