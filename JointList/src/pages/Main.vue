<template>
    <main class="statistic-wrapper container">
        <div class="statistic">
            <h1 class="title">БЛОК НЕ ГОТОВ</h1>
            <ul>
                <li class="list">Задач на сегодня: <strong>{{ today.length }}</strong></li>
                <li class="list">Есть несколько устаревших задач: <strong>{{ pastDates.length }}</strong></li>
                <li class="list">Задачи на будущее: <strong>{{ nextDates.length }}</strong></li>
            </ul>
        </div>
        <default-btn @click="$router.push('/calendar')" class="to-tasks">Приступить</default-btn>
        <default-btn @click="store.logout" class="to-tasks">Logout</default-btn>
    </main>
</template>
<script>
import {
    ref,
} from 'vue';
import { useTasksStore } from '../stores/TasksStore';
export default {
    setup() {
        const store = useTasksStore();
        const todoList = store.todoLists
        console.log(store.logout)
        const today = ref(todoList.filter(el => new Date(el.unformattedCalendarMark).setHours(0, 0, 0, 0) === new Date().setHours(0,0,0,0)))
        const pastDates = ref(todoList.filter(el => new Date(el.unformattedCalendarMark).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)))
        const nextDates = ref(todoList.filter(el => new Date(el.unformattedCalendarMark).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)))
    

    return {
        todoList,
        today,
        pastDates,
        nextDates,
        store,
    }
    }
}
</script>
<style lang="scss" scoped>
    .statistic-wrapper {
    font-family: monospace;
}
.statistic{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin: auto;
    margin-top: 15%;
    padding: 10px;
    font-size: $font-size-title; /* Add your font size value here */
    border-radius: 5px;
    color: #e1b883;
}
.to-tasks {
    margin: auto;
    margin-top: 50px;
    width: 170px;
    height: 40px;
    box-shadow: 0px 0px 1px 0px orange;
    border-radius: 4px;
    text-align: center;
    line-height: 40px;
    color: orange;
    font-family: serif;
}

.to-tasks:active{
    color: black;
    background: orange;
}
.title {
    margin-bottom: 10px;
    font-size: $font-size-main_title;
}
.list {
    list-style: disc;
    margin-left: 20px;
}
</style>