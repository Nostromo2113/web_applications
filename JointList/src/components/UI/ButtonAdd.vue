<template>
    <button class="btn-add" @click="showModal"><slot></slot></button>
</template>

<script>
    export default {
        name: 'button-add',

        methods: {
            showModal() {
                this.$emit('showModal')
            }
        }
    }
</script>

<style lang="scss" scoped>
.btn-add {
    position: fixed;
    z-index: 99;
    bottom: 20px;
    right: 20px;
    width: 68px;
    height: 68px;
    border-radius: 30%;
    background-color: var(--task-background-color);
    box-shadow: 0px 0px 1px 0px $turquoise;
    color: $turquoise;
    font-size: 48px;
    text-shadow: 0px 0px 5px $turquoise;
}
.btn-add:active {
    box-shadow: 0px 0px 3px 3px $turquoise;
    background-color: $turquoise;
    color: black;
}
</style>