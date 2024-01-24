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
<style lang="scss" scoped>
    .date {
        font-size: $font-size-normal;
        font-weight: bold;
    }
</style>