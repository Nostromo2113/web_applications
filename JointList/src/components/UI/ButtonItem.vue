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
    width: 25px;
    height: 25px;
    box-shadow: 0px 0px 8px -3px orange;
    border-radius: 50%;
    font-size: 13px;
    
}

</style>