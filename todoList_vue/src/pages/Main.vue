<template>
    <div class="statistic-wrapper">
    <div class="statistic">
        <p>Добро пожаловать: <strong>Ярослав</strong></p>
        <p>Задач на сегодня: {{today.length}}</p>
        <p>Есть несколько устаревших задач: {{ pastDates.length }}</p>
        <p>Задачи на будущее: {{ nextDates.length }}</p>
    </div>
        <default-btn @click="$router.push('/todos')" class="to-tasks"><strong>Перейти к задачам</strong></default-btn>
    </div>
</template>
<script>
import {
    ref,
    reactive,
    onMounted,
    computed
} from 'vue';
import { useTasksStore } from '../stores/TasksStore';
export default {
    setup() {
        const todoList = useTasksStore().todoLists
        const today = ref(todoList.filter(el => new Date(el.unformattedCalendarMark).setHours(0, 0, 0, 0) === new Date().setHours(0,0,0,0)))
        const pastDates = ref(todoList.filter(el => new Date(el.unformattedCalendarMark).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)))
        const nextDates = ref(todoList.filter(el => new Date(el.unformattedCalendarMark).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)))
    

        onMounted(()=>{
            console.log(today.value.length)
        })
    return {
        todoList,
        today,
        pastDates,
        nextDates,
    }
    }
}
</script>
<style>
    .statistic-wrapper {
        font-family: monospace;
    }
    .statistic{
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 90%;
        margin: auto;
        box-shadow: 0px 0px 1px 1px orange;
        margin-top: 80px;
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
    }
    .to-tasks {
        margin: auto;
        margin-top: 40px;
        width: 200px;
        height: 40px;
        background: darkorange;
        border-radius: 4px;
        text-align: center;
        line-height: 40px;
        color: rgb(28,28,28, 0.9);
        font-family: serif;
    }
</style>