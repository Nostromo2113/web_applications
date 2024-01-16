<template>
    <div class="tasks-list__wrapper">
    <div v-if="todoList.length !== 0"  class="tasks__list">
        <transition-group name="list">
        <TaskItem
        v-for="task in todoList"
        :taskItems="task"
        :key=task.id
        @redactionTaskElement="redactionTaskElement"
        @createTaskElement="createTaskElement1"
        @removeTask="removeTask"
        @removeTaskElement="removeTaskElement"
        >
        </taskItem>
    </transition-group>
    </div>
    <div v-else @click="console.log(todoList)">Список пуст</div>
    </div>
</template>



<script>
import TaskItem from '@/components/TaskItem.vue'
import { useTasksStore } from '../stores/TasksStore'
import {onMounted, ref, watch, computed} from 'vue'
    export default {
      name: 'tasks-list',
      setup() {
        
                const tasksStore = useTasksStore();

    const todoList = ref(computed(() => tasksStore.sortedAndSearchedPosts()));

            onMounted(() => {
    })
        return { 
          todoList,
        }

        
      },
    components: {
        TaskItem
    },

    methods: {
      redactionTaskElement(obj) {
      this.$emit('redactionTaskElement', obj)
      console.log('list',obj)
    },
      createTaskElement1 (element, id) {
        this.$emit("createTaskElement", element, id)
      },
      removeTask(id){
        this.$emit('removeTask', id);
        console.log('remove',id);
      },
      removeTaskElement(id) {
        this.$emit('removeTaskElement', id);
      },
    },
}
</script>


<style scoped>
  .tasks-list__wrapper {
    min-height: 75vh;
  }

    .tasks__list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 15px;
    }

    .list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(130px);
}

.list-move {
  transition: transform 0.5s ease;
}
</style>