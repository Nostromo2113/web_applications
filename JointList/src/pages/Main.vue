<template>
    <main class="statistic-wrapper">
        <div class="statistic">
            <p>Добро пожаловать: 'Your name'</p>
            <p>Задач на сегодня: {{today.length}}</p>
            <p>Есть несколько устаревших задач: {{ pastDates.length }}</p>
            <p>Задачи на будущее: {{ nextDates.length }}</p>
        </div>
        <default-btn @click="$router.push('/calendar')" class="to-tasks">Приступить</default-btn>
    </main>
</template>
<script>
import {
    ref,
} from 'vue';
import { useTasksStore } from '../stores/TasksStore';
export default {
    setup() {
        const todoList = useTasksStore().todoLists
        const today = ref(todoList.filter(el => new Date(el.unformattedCalendarMark).setHours(0, 0, 0, 0) === new Date().setHours(0,0,0,0)))
        const pastDates = ref(todoList.filter(el => new Date(el.unformattedCalendarMark).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)))
        const nextDates = ref(todoList.filter(el => new Date(el.unformattedCalendarMark).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)))
    

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
        width: 92%;
        margin: auto;
        box-shadow: 0px 0px 1px 0px orange;
        margin-top: 80px;
        padding: 10px;
        font-size: 15px;
        border-radius: 5px;
        color: #e1b883;
    }
    .to-tasks {
        margin: auto;
        margin-top: 50px;
        width: 170px;
        height: 40px;
        background: #1F2937;
        box-shadow: 0px 0px 1px 0px orange;
        border-radius: 4px;
        text-align: center;
        line-height: 40px;
        color: orange;
        font-family: serif;
    }
</style>