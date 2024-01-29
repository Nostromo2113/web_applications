<template>
    <button class="btn__input"><slot></slot></button>
</template>

<script>
    export default {
        name: 'button-input'
    }
</script>

<style scoped>
.btn__input {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);        
        width: 20px;
        height: 20px;
        border: 1px solid black;
        border-radius: 50%;
    }
</style>