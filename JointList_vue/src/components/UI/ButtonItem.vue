<template>
    <button class="btn__delete"><slot></slot></button>
</template>

<script>
    export default {
    name: 'button-item'
}
</script>

<style scoped>

.btn__delete {
    position: absolute;
    right: 6px;
    bottom: 6px;        
    width: 20px;
    height: 20px;
    box-shadow: 0px 0px 8px -3px orange;
    border-radius: 50%;
    font-size: 12px;
    
}

</style>