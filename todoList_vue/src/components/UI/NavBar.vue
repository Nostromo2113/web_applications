<template>
    <header class="header-container">
        <div class="navbar-header">
        <div class="navbar">
            <div @click="$router.push('/')">
                <h1 class="logo">JOINT LIST</h1>
            </div>
            <div class="navbar__btns">
                <default-btn @click="$router.push('/todos')">Карточки</default-btn>
                <default-btn @click="$router.push('/calendar')">Календарь</default-btn>
                <default-btn @click="$router.push('/about')">О приложении</default-btn>
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
    height: 35px;
    background: rgb(28, 28, 28, 0.8);
    box-shadow: 0px 1px 2px rgba(255, 187, 0, 0.877);
    color: orange;
    font-size: 10px;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
}
.header-container {
    height: 35px;
}
.navbar {
    max-width: 1000px;
    margin: auto;
    height: 35px;
    align-items: center;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    z-index: 9999;
}

.navbar__btns {
    display: flex;
}

.logo {
    color: rgba(255, 166, 0, 0.816);
}
</style>
