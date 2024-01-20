<template>
    <button class="btn__add"><slot></slot></button>
</template>

<script>
    export default {
        name: 'button-add'
    }
</script>

<style scoped>
.btn__add {
    width: 68px;
    height: 68px;
    border-radius: 30%;
    background-color: black;
    box-shadow: 0px 0px 3px 1px orange;
    position: fixed;
    bottom: 20px;
    right: 20px;
    color: orange;
    font-size: 48px;
    text-shadow: 0px 0px 10px orange;
}
.btn__add:active {
    box-shadow: 0px 0px 3px 3px orange;
    background-color: darkorange;
    color: black;
}
</style>