<template>
    <div class="container">
        <div 
            class="calendar-task-viewer_wrapper">
                <div 
                    class="calendar-form-wrapper">
                    <p 
                        class="date"
                        >
                        {{ day }}
                    </p>
                <add-form  class="add-form"/>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
import {ref, computed} from 'vue';
import AddForm from '@/components/blocks/AddForm.vue';
import { useTasksStore } from '@/stores/TasksStore';
export default {
  components: { AddForm },
    name: "calendar-task-viewer",
    props:{
        clickDay:{
            type: Date,
            default: new Date()
        }
    },
    setup(props){
        const tasksStore = useTasksStore()
        const day = ref(computed(() => new Date(tasksStore.clickDay).toLocaleDateString()));
    return {
        day
    }
    }
}
</script>
<style lang="scss" scoped> 

    .calendar-task-viewer_wrapper {
        margin: 0 auto 40px;
        border-radius: 3px;
        padding: 15px 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-family: monospace;
        min-height: 200px;
        // border-top: 1px solid rgb(79 79 79 / 87%);
    }
    .date {
        display: flex;
        align-items: center;
        color: $turquoise;
        background: var(--interface-color);
        padding: 10px;
        border-radius: 8px;
        font-size: $font-size-big-normal;
    }
    .calendar-form-wrapper{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .add-form {
        box-shadow: none;
        width: 60%;
    }


</style>