<template>
    <div class="loading-spinner__wrapper">
    <div class="loading-spinner"></div>
    </div>
</template>

<script>
    export default {
        name: 'loading-spinner',

    }
</script>

<!-- LOADING STYLE -->
<style scoped>

    .loading-spinner__wrapper {
        height: 75vh;
    }    

@keyframes loading {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        transform: scale(0.5);
        opacity: 0;
    }
}

.loading-spinner {
    width: 200px;
    height: 200px;
    border: 10px solid #529bfb;
    border-radius: 50%;
    border-top-color: transparent;
    animation: loading 1s linear infinite;
    margin: auto;
}
</style>