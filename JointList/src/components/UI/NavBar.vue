<template>
    <header class="header-container">
        <div class="navbar-header">
        <div class="navbar container">
            <div @click="$router.push('/')">
                <h1 class="logo">JOINT LIST</h1>
            </div>
            <div class="navbar__btns">
                <default-btn 
                class="navbar-btn" 
                :class="{'active': currentRoute === '/todos'}"
                @click="$router.push('/todos')"
                >
                List
                </default-btn>
                <default-btn 
                class="navbar-btn" 
                :class="{ 'active': currentRoute === '/calendar' }"
                @click="$router.push('/calendar')"
                >
                Calendar
                </default-btn>
                <default-btn 
                class="navbar-btn" 
                :class="{ 'active': currentRoute === '/about' }"
                @click="$router.push('/about')"
                >
                Info
                </default-btn>
                <label class="switch" for="checkbox">
                    <input type="checkbox" id="checkbox" v-model="isDarkTheme"/>
                    <div class="slider round"></div>
                </label>
            </div>
        </div>
        </div>
    </header>
</template>

<script>
export default {
    data: () => ({
        isDarkTheme: localStorage.getItem('theme') === 'dark',
    }),
    watch: {
        isDarkTheme: {
            handler(val) {
                const theme = val ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme)
            },
            immediate: true
        }
    },
    computed: {
        currentRoute() {
            return this.$route.path;
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar-header {
    position: fixed;
    font-family: sans-serif;
    height: clamp(2.5rem, 1.667rem + 3.33vw, 3.75rem);
    background: var(--background-main);
    color: var(--font-main-color);
    box-shadow: 0px 0px 2px 1px var(--task-background-color);
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    font-family: monospace;
    transition: 0.6s ease-in;
}
.header-container {
    height: 40px;
}
.navbar {
    height: clamp(2.5rem, 1.667rem + 3.33vw, 3.75rem);
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
    font-size: clamp(0.813rem, 0.688rem + 0.5vw, 1rem);
    transition: 0.3s ease-in;
}
.navbar-btn:hover{
    box-shadow: 0 2px 2px -2px $turquoise;
}
.navbar-btn:active {
    box-shadow: 0 2px 2px -2px $turquoise;
    text-shadow: 1px 1px 1px $turquoise;
}

.active {
    box-shadow: 0 2px 2px -2px turquoise;
}

.logo {
    font-size: $font-size-main_title;
}
//.........
.switch {
  display: inline-block;
  height: 17px;
  position: relative;
  width: 35px;
  margin: auto;
}

.switch input {
  display:none;
}

.slider {
  background-color: #c5f3f5;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .4s;
}

.slider:before {
  background-color: #fff;
  bottom: 0;
  content: "";
  height: 17px;
  left: 0;
  position: absolute;
  transition: .4s;
  width: 17px;
}

input:checked + .slider {
  background-color: #2e3034;
}

input:checked + .slider:before {
  transform: translateX(18px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}


</style>
