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

<style scoped>
.btn-add {
    position: fixed;
    z-index: 99;
    bottom: 20px;
    right: 20px;
    width: 68px;
    height: 68px;
    border-radius: 30%;
    background-color: black;
    box-shadow: 0px 0px 3px 1px orange;
    color: orange;
    font-size: 48px;
    text-shadow: 0px 0px 10px orange;
}
.btn-add:active {
    box-shadow: 0px 0px 3px 3px orange;
    background-color: darkorange;
    color: black;
}
</style>