<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style scoped>
.button {
        min-width: 80px;
        align-self: flex-end;
        border: 1px solid rgb(57, 189, 189);;
        padding: 5px;
        cursor: pointer;
        background-color: #fff;
        margin-left: 5px;
    }

    .button:hover{
        background-color: teal;
    }
</style>