<template>
    <div class="calendar-task-viewer_wrapper" @click="console.log(clickDay)">
        <div class="calendar-form-wrapper">
            <p class="date">{{ day }}</p>
            <add-form :date="clickDay" class="add-form" :clickDay="clickDay"/>
        </div>
        <slot></slot>
        
    </div>
</template>
<script>
import {ref, watch} from 'vue';
import AddForm from '../AddForm.vue';
export default {
  components: { AddForm },
    name: "calendar-task-viewer",

    props: {
        clickDay:{
            type: Date,
        }
    },

    setup(props){
        const day = ref(new Date(props.clickDay).toLocaleDateString());

    watch(() => props.clickDay, (newDate) => {
        
            day.value = new Date(newDate).toLocaleDateString();
        });

    return {
        day, 
    }
    }
}
</script>
<style scoped>
    .calendar-task-viewer_wrapper {
        margin: 0 auto 40px;
        border-radius: 6px;
        padding: 10px 15px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        background: rgb(28, 28, 28, 0.3);
    }
    .date {
        display: inline-block;
        color: black;
        background: darkorange;
        padding: 10px;
        border-radius: 8px;
        width: fit-content;
        line-height: normal;
    }
    .calendar-form-wrapper{
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    }
    .add-form {
        box-shadow: none;
    }
</style>