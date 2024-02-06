<template>
    <div class="app">
        <nav-bar/>
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>
<script>
import NavBar from './components/UI/NavBar.vue'
export default {
  components: { NavBar },
}
</script>

<style>
</style>

