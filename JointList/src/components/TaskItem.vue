<template>
<div class="tasksWrap">
    <div 
    class="task-item" 
    :class="{
        'task__item-full-window': taskFullWindow,
    }"
    >
        <div style="margin-bottom: 8px;">
            {{ dialogCalendarVisible.value }}
            <button-item 
                class="btn-accordion"
                @click="isOpen = !isOpen" 
                v-if="!taskFullWindow" 
            >
            <i v-if="isOpen" class="pi pi-angle-up"></i>
            <i v-if="!isOpen" class="pi pi-angle-down"></i> 
            </button-item>
            <button-item 
                class="btn-task__page"
                @click="$router.push(`/taskpage/${taskItems.id}`)" 
                v-if="!taskFullWindow"   
                >
                <i class="pi pi-folder-open"></i> 
            </button-item>
            <div>
                {{ taskItems.title }}
            </div>
            <time-visible>
                Добавлено: {{ taskItems.date }}
            </time-visible>
            <time-visible :task="taskItems">
                Календарь: {{ taskItems.calendarMark  }}
            </time-visible>
        </div>
        <Collapse 
            :when="taskFullWindow||isOpen" 
            class="my-class">
            <div 
                class="task-elems__wrapper">
                <div 
                    class="taskElems" 
                    :class="taskFullWindow ? 'taskElems-full-window' : ''"
                    v-for="el in taskItems.list" 
                    :key="el.id">
                    <div 
                        class="redaction-element" 
                        v-if="elementRedactionInput !== el.id">
                        <default-btn   
                            @click="showRedactionInput(el.id)"
                            >
                            ✎
                        </default-btn>
                        <div 
                            style="width: 100%;">
                            {{el.item }}
                        </div>
                        <default-btn  
                        class="btn-delete-taskelement" 
                        @click="removeTaskElement(el.id)">
                            -
                        </default-btn>
                    </div>
                    <div 
                        class="redaction-element" 
                        v-else>
                        <default-btn 
                            @click="showRedactionInput(el.id),
                            redactionTaskElement(redactionElement, el.id)"> ✓
                        </default-btn>
                        <my-input 
                            :redactionStyle="true"
                            v-focus 
                            v-model="redactionElement" 
                            @click="redactionElement=el.item" 
                            :placeholderText4="el.item" :is="4" />
                    </div>
                </div>
            </div>
            <button-item 
                class="btn-add__task__element"  
                @click="createTaskElement(taskItems)"
                >
            <i class="pi pi-plus"></i>
            </button-item>
        </Collapse>
        <button-item 
            class="btn-delete"
            v-if="!taskFullWindow" 
            @click="removeTask(taskItems.id)"><i class="pi pi-trash"></i> 
        </button-item>
        <button-item 
            class="btn-task-calendar"
            @click="showCalendarDialog()"
            >
            <i class="pi pi-calendar-plus"></i> 
        </button-item>
        <my-dialog 
            @click="showCalendarDialog()" 
            :show="dialogCalendarVisible"
            :calendar="true"      
            >
            <calendar 
                @closeDialog="dialogCalendarVisible = false"
                :dialog="true" 
                :showButton="true" 
                :taskItems="taskItems" 
                style="width:100%">
            </calendar>
        </my-dialog>
    </div>
</div>
</template>

<script>
import {
    useTasksStore
} from '../stores/TasksStore'
import {
    ref,
    watch
} from 'vue';
import Calendar from '@/components/calendar/Calendar.vue'
import {
    Collapse
} from 'vue-collapsed'
export default {
    name: 'task-item',
    components: {
        Collapse,
        Calendar
    },
    props: {
        taskItems: {
            type: [Object, Array],
            required: true,
        },
        idRoute: {
            type: Number
        },
        taskFullWindow: {
            type: Boolean
        },
    },
    setup(props) {
        const taskItems = ref(props.taskItems);

        const idRoute = ref(props.idRoute);
        const store = useTasksStore();
        const todoList = store.todoLists;
        const dialogCalendarVisible = ref(false);
        const redactionElement = ref('');
        const elementRedactionInput = ref(null);
        const placeholderText4 = "Отредактируйте элемент";
        const isOpen = ref(false);

        const taskFullWindow = ref(props.taskFullWindow);

        watch(idRoute, (newValue) => {
            taskItems.value = store.todoLists.find(el => el.id === id)
        });


        const showRedactionInput = (id) => {
            if (elementRedactionInput.value === id) {
                elementRedactionInput.value = null;
            } else
                elementRedactionInput.value = id;
        }

        const showCalendarDialog = () => {
            dialogCalendarVisible.value = !dialogCalendarVisible.value;
        }
        const redactionTaskElement = (element, elId) => {
            const id = elId;
            const obj = {
                item: element,
                id: id,
            };
            if (element !== '') {
                store.redactionTaskElement(obj);
                redactionElement.value = '';
            }
        }
        const createTaskElement = (taskItems) => {
            const element = {
                id: new Date(),
                item: "..."
            };
            const id = taskItems.id;
            store.createTasksElement(element, id);
        }
        const OpenCloseAccordion = () => {
            isOpen.value = !isOpen.value
            console.log(isOpen.value)
        }
        const removeTask = (id) => {
            store.deleteTask(id);
        }
        const removeTaskElement = (id) => {
            store.removeTasksElement(id);
        }



        return {
            taskItems,
            taskFullWindow,
            idRoute,
            store,
            todoList,
            dialogCalendarVisible,
            redactionElement,
            elementRedactionInput,
            placeholderText4,
            isOpen,
            showRedactionInput,
            showCalendarDialog,
            redactionTaskElement,
            createTaskElement,
            OpenCloseAccordion,
            removeTask,
            removeTaskElement,
        }

    },
}
</script>

<style lang="scss" >
.task-item {
    position: relative;
    border-radius: 6px;
    background: var(--task-background-color);
    font-family: monospace;
    padding: 13px 6px 35px 6px;
    box-shadow: 0px 0px 30px 0px var(--shadow-color);
    font-size: $font-size-title;
}



.task__item-full-window {
    max-width: 700px;
    margin: auto;
    padding: 25px 10px 50px 10px;
    border: none;
    box-shadow: none;
}

.task-elems__wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.taskElems {
    padding: 2px;
    font-size: $font-size-title;
    box-shadow: 0 2px 2px -2px rgb(211, 211, 211);
}

.taskElems-full-window {
    padding: 10px;
    font-size: 15px;
}

.btn-add__task__element {
    bottom: 3px;
    left: 0;
}

.redaction-element {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
}

.btn-delete {
    right: 50%;
    transform: translateX(50%);
    bottom: 3px;
}

.btn-accordion {
    right: 0;
    top: 3px;
}

.btn-task__page {
    right: 0;
    top: 40px;
}

.btn-task-calendar {
    bottom: 3px;
    right: 0;
}
</style>
