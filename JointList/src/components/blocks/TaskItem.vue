<template>
<div class="tasks-wrapper">
    <div 
    class="task-item" 
    :class="{
        'task-item__full-window': taskFullWindow,
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
                @click="$router.push(`/taskpage/${taskItem.id}`)" 
                v-if="!taskFullWindow"   
                >
                <i class="pi pi-folder-open"></i> 
            </button-item>
            <div>
                {{ taskItem.title }}
            </div>
            <time-visible>
                Added: {{ taskItem.date }}
            </time-visible>
            <time-visible :task="taskItem">
                Calendar: {{ taskItem.calendarMark  }}
            </time-visible>
        </div>
        <Collapse 
            :when="taskFullWindow||isOpen" 
            class="my-class">
            <div 
                class="task-elems__wrapper">
                <div 
                    class="task-elems" 
                    :class="taskFullWindow ? 'task-elems__full-window' : ''"
                    v-for="el in taskItem.list" 
                    :key="el.id">
                    <div 
                        @click="showRedactionInput(el.id), redactionElement = el.item"
                        class="redaction-element" 
                        v-if="elementRedactionInput !== el.id">
                        <!-- <default-btn   
                            @click="showRedactionInput(el.id)"
                            >
                            ✎
                        </default-btn> -->
                            {{el.item }}
                        <default-btn  
                        class="btn-delete-tasklement" 
                        @click="removeTaskElement(el.id)">
                            -
                        </default-btn>
                    </div>
                    <div 
                        class="redaction-element" 
                        v-else>
                        <input
                            class="redaction-input"
                            :redactionStyle="true"
                            v-focus 
                            v-model="redactionElement" 
                            :placeholderText="el.item"/>
                        <default-btn 
                            @click="showRedactionInput(el.id),
                            redactionTaskElement(redactionElement, el.id)"> ✓
                        </default-btn>
                    </div>
                </div>
            </div>
            <button-item 
                class="btn-add__task-element"  
                @click="createTaskElement(taskItem)"
                >
            <i class="pi pi-plus"></i>
            </button-item>
        </Collapse>
        <button-item 
            class="btn-delete"
            v-if="!taskFullWindow" 
            @click="removeTask(taskItem.id)"><i class="pi pi-trash"></i> 
        </button-item>
        <button-item 
            class="btn-task-calendar"
            @click="dialogCalendarVisible = !dialogCalendarVisible"
            >
            <i class="pi pi-calendar-plus"></i> 
        </button-item>
        <my-dialog 
            @click="dialogCalendarVisible = !dialogCalendarVisible" 
            :show="dialogCalendarVisible"
            :calendar="true"      
            >
            <calendar 
                @getClickDay="writeClickDayToStore"
                @closeDialog="dialogCalendarVisible = false"
                @clickOkBtn="addCalendarMark(taskItem)"
                :dialog="true" 
                :showButton="true" 
                :taskItem="taskItem" 
                style="width:100%">
            </calendar>
        </my-dialog>
    </div>
</div>
</template>

<script>
import {
    useTasksStore
} from '@/stores/TasksStore'
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
        taskItem: {
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
        const taskItem = ref(props.taskItem);

        const idRoute = ref(props.idRoute);
        const store = useTasksStore();
        const todoList = store.todoLists;
        const dialogCalendarVisible = ref(false);
        const redactionElement = ref('');
        const elementRedactionInput = ref(null);
        const isOpen = ref(false);

        const taskFullWindow = ref(props.taskFullWindow);

        watch(idRoute, (newValue) => {
            taskItem.value = store.todoLists.find(el => el.id === id)
        });


        const showRedactionInput = (id) => {
            if (elementRedactionInput.value === id) {
                elementRedactionInput.value = null;
            } else
                elementRedactionInput.value = id;
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
        const createTaskElement = (taskItem) => {
            const element = {
                id: new Date(),
                item: "..."
            };
            const id = taskItem.id;
            store.createTasksElement(element, id);
        }
        const OpenCloseAccordion = () => {
            isOpen.value = !isOpen.value
        }
        const removeTask = (id) => {
            store.deleteTask(id);
        }
        const removeTaskElement = (id) => {
            store.removeTasksElement(id);
        }
        const addCalendarMark = (taskItem) => {
            store.addCalendarMark(taskItem);
        }
        const writeClickDayToStore = (date, dialog) => {
            console.log('write', date, dialog)
            if (!dialog) {
                store.getTasksForToday(date);
            }
                store.writeClickDay(date, dialog);
        };


        return {
            taskItem,
            taskFullWindow,
            idRoute,
            store,
            todoList,
            dialogCalendarVisible,
            redactionElement,
            elementRedactionInput,
            isOpen,
            writeClickDayToStore,
            showRedactionInput,
            redactionTaskElement,
            createTaskElement,
            OpenCloseAccordion,
            removeTask,
            removeTaskElement,
            addCalendarMark,
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



.task-item__full-window {
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

.task-elems {
    padding: 2px;
    font-size: $font-size-title;
    box-shadow: 0 2px 2px -2px rgb(211, 211, 211);
}

.task-elems__full-window {
    padding: 10px;
    font-size: 15px;
}

.btn-add__task-element {
    bottom: 3px;
    left: 0;
}

.redaction-element {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    word-break: break-word;
}

.redaction-input {
    font-size: $font-size-title;
    width: inherit;
    height: inherit;
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
