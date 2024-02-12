<template lang="">
    <div class="full-task-wrapper">
        <task-item :taskItem="itTask" :idRoute="id" :taskFullWindow="true" />
    </div>
</template>

<script>
import {
    ref,
    computed
} from 'vue';
import {
    useRoute
} from 'vue-router';
import {
    useTasksStore
} from '../stores/TasksStore';

export default {

    setup() {
        const todoList = ref(useTasksStore().todoLists);
        const id = Number( useRoute().params.id);
        const itTask = computed(() => todoList.value.find(el => el.id === id));

        return {
            todoList,
            id,
            itTask,
        }
    }
}
</script>

<style scoped>
    .full-task-wrapper{
        margin-top: 3%;
        padding: 20px 10px 20px 10px;
    }
</style>
