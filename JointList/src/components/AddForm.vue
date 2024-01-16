<template>
    <form class="form" @submit.prevent="createTask(taskTitle, date, formattedDate )">
        <my-input :is="2" :placeholderText2="placeholderText2" v-model="taskTitle" />
        <default-btn class="default-btn" @click.stop="$emit('close')">✚</default-btn>
    </form>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useTasksStore } from '../stores/TasksStore';
export default {
    name: "add-form",

    props: {
        date: {
            type: Date,
            default: new Date(),
        }
    },

    setup(props) {
        const store = useTasksStore();

        const date = ref(computed(() => new Date(store.clickDay)))
        const formattedDate = ref(computed(() => new Date().toLocaleString().split(',')[0]));

        const placeholderText2 = "Заголовок";

        const taskTitle = ref('');

        const createTask = (title, date, formattedDate) => {
            console.log('TITLE', title)
            const task = {
                id: Date.now(),
                title: title,
                list: [{
                    id: Date.now(),
                    item: "..."
                },],
                unformattedCalendarMark: date,
                date: formattedDate,
                calendarMark: date.toLocaleString().split(',')[0],
            };
            console.log('TASKTITLE',task.title)
            if(task.title !== '') {
                store.createTasks(task)
            }
            taskTitle.value = '';
            return
        }

        watch(() => date, (newDate) => {
            console.log('FORMDATE', date)
            // date.value = new Date(newDate);
            // task.value.unformattedCalendarMark = date.value;
            // task.value.calendarMark = date.value.toLocaleDateString().split(',')[0];
        }, {deep:true});

        return {
            store,
            date,
            formattedDate,
            placeholderText2,
            taskTitle,
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
