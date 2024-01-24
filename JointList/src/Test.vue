<template>
    <div>
        <ul>
            <li v-for="list in todoLists" :key="list.id">
                {{ list.title }}
                <ul>
                    <li v-for="item in list.list" :key="item.id">
                        {{ item.item }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { useTasksStore } from 'путь/к/вашему/хранилищу';

export default {
    data() {
        return {
            todoLists: [],
        };
    },
    created() {
        this.todoLists = useTasksStore().todoLists;
    },
    // Здесь вы также можете использовать методы из хранилища, например:
    // methods: {
    //   addNewTask() {
    //     useTasksStore().addNewTask({ title: 'New Task', list: [] });
    //   },
    // },
};
</script>