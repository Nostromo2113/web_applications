<template>
    <div>
        <select
        class="select"
        :value="modelValue"
        @change="changeOptions"
        >
    <option disabled selected value="">Сортировка списков</option>
    <option 
    v-for="option in options"
    :key="option.value"
    :value="option.value"
    >
        {{ option.name }}
</option>
    </select>
    </div>
</template>
<script>
export default {
    props: {
        modelValue: {
            type: String,
        },
        options: {
            type: Array,
            default: () => [],  //При получении пустых массивов рекомендуется такая запись
        }
    },
    name: 'my-select',
    methods: {
        changeOptions(event) {
            console.log(event)
            this.$emit('update:modelValue', event.target.value)
        },
}
}
</script>
<style scoped>
    .select {
        margin-top: 5px;
    }
</style>