import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import components from "./components/importComponents"
import componentsUI from "./components/UI/importUI"
import router from "./router/router"
import directives from './directives'



const pinia = createPinia();
const app = createApp(App);

components.forEach(component => {
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