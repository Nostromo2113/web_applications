<template>
    <form class="form" @submit.prevent>
    <my-input :is="is" :placeholderText1="placeholderText1"
    />
    </form>
</template>

<script>
    export default {
        name: 'search',
        props: {
            
        },
        data () {
            return{
                myDataValue: true,
                placeholderText1: "Поиск по заголовку",
                is: 1,
                
            }
        },
        methods: {
            searchGo() {
                return this.$emit('search', this.searchQuery)
            }
        }
    }
</script>

<style scoped>
.form {
    position: relative;
}
</style>
