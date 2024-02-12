import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'primeicons/primeicons.css'
import './assets/reset.css'
import blocks from "./components/blocks/importBlocks"
import componentsUI from "./components/UI/importUI"
import router from "./router/router"
import directives from './directives'



const pinia = createPinia();
const app = createApp(App);

blocks.forEach(component => {
    app.component(component.name, component)
})

componentsUI.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app
    .use(router)
    .use(pinia)
    .mount('#app')