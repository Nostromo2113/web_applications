<template>
<div class="tasksWrap">
    <div 
    class="task-item" 
    :class="{
        'task__item-full-window': taskFullWindow,
        'task-item-before': controlDate(taskItems.unformattedCalendarMark) == true,
        'task-item-after': controlDate(taskItems.unformattedCalendarMark) == false,
    }"
    >
        <div style="margin-bottom: 8px;">
            {{ dialogCalendarVisible.value }}
            <button-item 
                class="btn-accordion"
                @click="isOpen = !isOpen" 
                v-if="!taskFullWindow" 
            >
            {{ isOpen ? '▲' : '▼' }}
            </button-item>
            <button-item 
                class="btn-task__page"
                @click="$router.push(`/taskpage/${taskItems.id}`)" 
                v-if="!taskFullWindow"   
                >
                📄
            </button-item>
            <div>
                {{ taskItems.title }}
            </div>
            <time-visible>
                Добавлено: {{ taskItems.date }}
            </time-visible>
            <time-visible>
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
                            v-focus 
                            style="padding: 4px; 
                            border-radius: 0; 
                            box-shadow: none; 
                            border:none; 
                            border-bottom: 0.1px dotted silver;" 
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
            ✚
            </button-item>
        </Collapse>
        <button-item 
            class="btn-delete"
            v-if="!taskFullWindow" 
            @click="removeTask(taskItems.id)">🗑️
        </button-item>
        <button-item 
            class="btn-task-calendar"
            @click="showCalendarDialog()"
            >
            📅
        </button-item>
        <my-dialog 
            @click="showCalendarDialog()" 
            :show="dialogCalendarVisible"
            
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
    reactive,
    onMounted,
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
        const taskItems = reactive(props.taskItems);

        const idRoute = ref(props.idRoute);
        const store = useTasksStore();
        const todoList = store.todoLists;
        const isEditable = false;
        const dialogTaskVisible = false;
        const dialogCalendarVisible = ref(false);
        const redactionElement = ref('');
        const elementRedactionInput = ref(null);
        const placeholderText4 = "Отредактируйте элемент";
        const isOpen = ref(false);
        const showInput = true;

        const taskFullWindow = ref(props.taskFullWindow);

        onMounted(() => {
        })

        watch(idRoute, (newValue) => {
            taskItems = store.todoLists.find(el => el.id === id)
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

        const controlDate = (taskDate) => {
            if(taskDate){
            const today = new Date();
            const taskDay = new Date(taskDate);
            taskDay.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0); 

            if (today.getTime() > taskDay.getTime()) {
                return true
            } else if (today.getTime() < taskDay.getTime()) {
                return false
            } else {
                return
            }
        }   
        };

        return {
            taskItems,
            taskFullWindow,
            idRoute,
            store,
            todoList,
            isEditable,
            dialogTaskVisible,
            dialogCalendarVisible,
            redactionElement,
            elementRedactionInput,
            placeholderText4,
            isOpen,
            showInput,
            controlDate,
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

<style lang="scss" scoped>
.task-item {
    position: relative;
    padding: 13px 6px 35px 6px;
    border-radius: 6px;
    background: $task-background-color;
    box-shadow: 0px 0px 3px 1px darkorange;
    font-size: $font-size-title;
    font-family: monospace;
    text-shadow: 0px 0px 3px orange;
}
.task-item-before {
    box-shadow: 0px 0px 3px 1px orangered;
}
.task-item-after {
    box-shadow: 0px 0px 3px 1px rgb(79 145 219 / 66%);
}
.task__item-full-window {
    padding: 25px 10px 50px 10px;
    box-shadow: none;
    max-width: 700px;
    margin: auto;
    border: none;
}

.task-elems__wrapper{
    display: flex;
    flex-direction: column;
    gap: 5px;
}


.taskElems {
    padding: 2px;
    font-size: $font-size-normal;
    box-shadow: 0 2px 2px -2px rgb(211,211,211);
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
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.btn-delete {
    right: 50%; transform: translateX(50%);
    bottom: 3px;
}
.btn-delete-taskelement {
    float: right;
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
