<template>
    <header class="header-container">
        <div class="navbar-header">
        <div class="navbar container">
            <div @click="$router.push('/')">
                <h1 class="logo">JOINT LIST</h1>
            </div>
            <div class="navbar__btns">
                <default-btn class="navbar-btn" @click="$router.push('/todos')">Список</default-btn>
                <default-btn class="navbar-btn" @click="$router.push('/calendar')">Календарь</default-btn>
                <default-btn class="navbar-btn" @click="$router.push('/about')">Инфо</default-btn>
            </div>
        </div>
        </div>
    </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.navbar-header {
    position: fixed;
    font-family: sans-serif;
    height: 40px;
    background: #000000db;
    box-shadow: 0px 1px 2px rgba(255, 187, 0, 0.877);
    color: orange;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
}
.header-container {
    height: 40px;
}
.navbar {
    height: 40px;
    align-items: center;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    z-index: 9999;
}

.navbar__btns {
    display: flex;
    gap: 8px;
}
.navbar-btn {
    box-shadow: 0px 0px 2px 0px orange;
    background: #121212;
    border-radius: 4px;
    font-size: clamp(0.813rem, 0.688rem + 0.5vw, 1rem);
}
.navbar-btn:hover{
    background: darkorange;
    color: black;
}
.navbar-btn:active {
    background: darkorange;
    color: black;
}

.logo {
    color: rgba(255, 166, 0, 0.816);
    font-size: $font-size-main_title;
}
</style>
