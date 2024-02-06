<template>
    <button class="btn-item"><slot></slot></button>
</template>

<script>
    export default {
    name: 'button-item'
}
</script>

<style scoped>

.btn-item {
    position: absolute;       
    width: 25px;
    height: 25px;
    border-radius: 50%;
    font-size: 13px;
}

</style>