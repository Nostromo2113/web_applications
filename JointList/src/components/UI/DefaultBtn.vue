<template>
    <div>
        <button  @click="buttonClicked" class="default-btn"><slot></slot></button>
    </div>
</template>
<script>
export default {
    name: "default-btn",

    methods: {
        buttonClicked() {
            this.$emit('button-clicked')
        },
    }
}
</script>
<style scoped>
    .default-btn {
        padding: 4px;
        border-radius: 10px;
        font-weight: bold;
    }
</style>