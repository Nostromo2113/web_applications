<template>
<form class="form">
    <text-block>Добавьте список дел</text-block>
    <my-input  v-focus :is="2" :placeholderText2="placeholderText2" v-model="task.title" />
    <default-btn class="default-btn" @button-clicked="store.createTasks(task), $emit('close')">OK</default-btn>
</form>
</template>

<script>
import {reactive} from 'vue';
import {useTasksStore} from '../stores/TasksStore';
export default {
    setup () {
        const store = useTasksStore();
        
        const date = new Date()
        const formattedDate = date.toLocaleString().split(',')[0];

        const placeholderText2 = "Заголовок";

        const task = reactive({
            id: Date.now(),
            title: '',
            list: [{
                id: Date.now(),
                item: "..."
            },],
            unformattedCalendarMark: null,
            date: formattedDate,
            calendarMark: 'Добавьте в календарь',
        });

        return {
            store,
            date,
            formattedDate,
            placeholderText2,
            task,
        };
    }
}
</script>

<style scoped>
.form {
    display: grid;
    gap: 20px;
}

.default-btn {
    margin: 0 auto;
    box-shadow: 0px 0px 1px 1px orange;
    color: orange;
    font-weight: bold;
}
</style>
