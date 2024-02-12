<template>
<form class="form" @submit.prevent="createTask(taskTitle, date, formattedDate ), $emit('close')">
    <my-input style="position: relative;" :placeholderText="'Add list'" v-model="taskTitle" />
    <default-btn class="default-btn" @click="createTask(taskTitle, date, formattedDate)">✚
    </default-btn>
</form>
</template>

<script>
import {
    ref,
    computed
} from 'vue';
import {
    useTasksStore
} from '@/stores/TasksStore';
export default {
    name: "add-form",

    props: {
        date: {
            type: Date,
            default: new Date(),
        }
    },

    setup() {
        const store = useTasksStore();
        const date = ref(computed(() => new Date(store.clickDay)))
        const formattedDate = ref(computed(() => new Date().toLocaleString().split(',')[0]));
        const taskTitle = ref('');

        const createTask = (title, date, formattedDate) => {
            console.log('TITLE', title)
            const task = {
                id: Date.now(),
                title: title,
                list: [{
                    id: Date.now(),
                    item: "..."
                }, ],
                unformattedCalendarMark: date,
                date: formattedDate,
                calendarMark: date.toLocaleString().split(',')[0],
            };
            if (task.title !== '') {
                store.createTasks(task)
            }
            taskTitle.value = '';
            return
        }

        return {
            store,
            date,
            formattedDate,
            taskTitle,
            createTask,
        };
    }
}
</script>

<style scoped>
.form {
    display: flex;
    position: relative;
}

.default-btn {
    position: absolute;
    color: turquoise;
    font-size: 14px;
    top: 50%;
    right: 3px;
    transform: translateY(-50%);
}
</style>
