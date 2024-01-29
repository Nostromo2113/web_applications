<template>
  <main class="tasks-list__wrapper">
    <div v-if="todoList.length !== 0"  class="tasks__list">
        <transition-group name="list">
        <task-item
        v-for="task in todoList"
        :taskItems="task"
        :key=task.id
        >
        </task-item>
    </transition-group>
    </div>
    <div v-else>Список пуст</div>
  </main>
</template>



<script>
import { useTasksStore } from '../stores/TasksStore'
import {ref, computed} from 'vue'
    export default {
      name: 'tasks-list',
      setup() {
        const tasksStore = useTasksStore();
        const todoList = ref(computed(() => tasksStore.sortedAndSearchedPosts()));

        return { 
          todoList,
        }
      },
}
</script>


<style scoped>
  .tasks-list__wrapper {
    padding-bottom: 20px;
  }

    .tasks__list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 15px;
    }
/* TRANSITION */
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
/* TRANSITION */
@media (min-width: 768px) {
    .tasks__list {
      grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 365px){
  .tasks__list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>