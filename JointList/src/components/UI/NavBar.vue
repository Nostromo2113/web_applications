<template>
    <header class="header-container">
        <div class="navbar-header">
        <div class="navbar">
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

<style>
.navbar-header {
    position: fixed;
    font-family: sans-serif;
    height: 40px;
    background: rgb(28, 28, 28, 0.8);
    box-shadow: 0px 1px 2px rgba(255, 187, 0, 0.877);
    color: orange;
    font-size: 13px;
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
    max-width: 1000px;
    margin: auto;
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
    background: #1F2937;
    border-radius: 4px;
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
}
</style>
