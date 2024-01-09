import Main from '../pages/Main.vue';
// import TodosPage from '../pages/TodosPage.vue'
import TodosPageComposition from '../pages/TodosPageComposition.vue'
import Calendar from '../components/calendar/Calendar.vue'
import About from '../pages/About.vue'
import TaskPage from '../pages/TaskPage.vue'
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/todos',
        component: TodosPageComposition,
    },
    {
        path: '/calendar',
        component: Calendar,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/taskpage/:id',
        component: TaskPage
    }
]

 //Готовая функция. Роутер включаем при развертке приложения.
 //В функцию нужно передать маршруты. Массив routes. Т.к. мы создали history mode, 
 //необходимо создать веб историю => createWebHistory(prcess.env.BASE_URL) => данный аргумент
 //добавлять необязательно
const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;
//Роутер необходимо зарегестрировать в файле main.js