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
    <div class="empty-list" v-if="loader&&todoList.length==0">Nothing found. Add lists</div>
    <loader v-if="!loader" style="margin-top: 15%;"></loader>
  </main>
</template>



<script>
import { useTasksStore } from '../stores/TasksStore'
import {ref, computed, onMounted} from 'vue'
    export default {
      name: 'tasks-list',
      setup() {
        const tasksStore = useTasksStore();
        const todoList = ref(computed(() => tasksStore.sortedAndSearchedPosts()));
        const loader = ref(computed(()=>tasksStore.tasksLoader))
        console.log(loader.value)


        return { 
          todoList,
          loader
        }
      },
}
</script>


<style lang="scss" scoped>
  .tasks-list__wrapper {
    padding-bottom: 20px;
    font-family: monospace;
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
.empty-list {
  font-size: $font-size-main_title;
  color: $turquoise;
  text-align: center;
  margin: auto;
  margin-top: 15%;
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