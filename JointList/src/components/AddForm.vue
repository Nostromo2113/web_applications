<template>
<form class="form">
    <my-input :is="2" :placeholderText2="placeholderText2" v-model="task.title" />
    <default-btn  class="default-btn" @click="createTask(task, date), $emit('close')">✚</default-btn>
</form>
</template>

<script>
import {ref} from 'vue';
import {useTasksStore} from '../stores/TasksStore';
export default {
    name: "add-form",

    props: {
        date: {
            type: Date,
            default: new Date(),
        }
    },
    
    setup (props) {
        const store = useTasksStore();
        
        const date = props.date
        const formattedDate = date.toLocaleString().split(',')[0];

        const placeholderText2 = "Заголовок";

        const task = ref({
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

        const createTask = (task, date) => {
            console.log('DATE', date)
            if(date) {
                task.unformattedCalendarMark = date;
                task.calendarMark = date.toLocaleString().split(',')[0]
                store.createTasks(task);
            } else {
                store.createTasks(task);
            }
        }

        return {
            store,
            date,
            formattedDate,
            placeholderText2,
            task,
            createTask,
        };
    }
}
</script>

<style scoped>
.form {
    position: relative;
    display: flex;
    gap: 20px;
}

.default-btn {
    margin: 0 auto;
    color: orange;
    font-weight: bold;
    position: absolute;
    right: 0;
    font-size: 14px;
    border-radius: 100%;
}
</style>
