<template>
    <div 
    class="dialog" 
    v-if="show" 
    @click.stop="hideDialog">
        <div 
        class="dialog-content" 
        :class="{ 'dialog-content-calendar': calendar }"
        @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {

    name: 'my-dialog',

    props: {
        show: {
            type: Boolean,
            default: false
        },
        calendar: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        },

    },

}
</script> 

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgb(133 137 169 / 30%);
    position: fixed;
    display: flex;
    z-index: 9998;
}

.dialog-content {
    margin: auto;
    background: var(--task-background-color);
    border-radius: 12px;
    min-height: 50px;
    padding: 15px;
    width: 92%;
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    z-index: 9999;
    font-family: sans-serif;
    text-align: center;
}
.dialog-content-calendar {
    padding-top: 40px;
}

@media (min-width: 850px) {
    .dialog-content {
        width: 45%;
    }
.dialog-content {
    padding-right: 40px;
    padding-left: 40px;
}
}
</style>
