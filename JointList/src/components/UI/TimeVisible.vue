<template>
    <div>
        <span class="date"><slot></slot></span>
    </div>
</template>
<script>
export default {
    name: 'time-visible',
}
</script>
<style scoped>
    .date {
        font-size: 10px;
        font-weight: bold;
    }
</style>