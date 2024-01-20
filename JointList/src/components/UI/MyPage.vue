<template>
    <div class="page__wrapper"    
    >
        <div class="page"
        v-for="pageNumber in this.totalPages"
        :key="pageNumber"
        @click="changePage(pageNumber)"
        :class="{
            'current-page': page === pageNumber
        }"
        >
            {{ pageNumber }}
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'my-page',

        props: {
            page: {
                type: Number,
            },
            totalPages: {
                type: Number,
            }
        },

        methods: {
            changePage(pageNumber) {
                this.$emit('changePageNumber', pageNumber)
                console.log('page', this.page, 'totalPages', this.totalPages, 'pageNumber', pageNumber);
            }
        },
    }
</script>

<style scoped>
    .page__wrapper {
        display: flex;
        flex-direction: row;
        margin: 5px 0px 10px 10px;
        gap: 3px;
}
    .page {
        border: 1px solid #D9E8FC;
        padding: 6px;
        cursor: pointer;
        gap: 10px;
        border-radius: 5px;
    }

    .page:hover {
        background-color: #D9E8FC;    
    }
    .current-page {
        background-color: #D9E8FC; 
    }
</style>