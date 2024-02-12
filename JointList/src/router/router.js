import TodoList from '../pages/TodoList.vue'
import Calendar from '../pages/CalendarPage.vue'
import About from '../pages/About.vue'
import TaskPage from '../pages/TaskPage.vue'
import Registration from '../pages/Registration.vue'
import Auth from '../pages/Auth.vue'
import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '../clients/supabase'

const routes = [
    {
        path: '/',
        component: Auth,
    },
    {
        path: '/todos',
        component: TodoList,
        meta: { requiresAuth: true }
    },
    {
        path: '/calendar',
        component: Calendar,
        meta: { requiresAuth: true }
    },
    {
        path: '/about',
        component: About,
        meta: { requiresAuth: true }
    },
    {
        path: '/taskpage/:id',
        component: TaskPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/registration',
        component: Registration
    }
]

 //Готовая функция. Роутер включаем при развертке приложения.
 //В функцию нужно передать маршруты. Массив routes. Т.к. мы создали history mode, 
 //необходимо создать веб историю => createWebHistory(prcess.env.BASE_URL) => данный аргумент
 //добавлять необязательно

const router = createRouter({
  routes,
  history: createWebHistory(),
  
})
export default router;
//Роутер необходимо зарегестрировать в файле main.js

let localUser = null;

async function getUser(next) {
  localUser = await supabase.auth.getSession();
  if(localUser.data.session == null) {
    next("/registration");
  } else {
    next();
  }
}

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {  //requires - требует
    console.log("requires Auth") // Если требует авторизацию
    getUser(next);
  } else { //Если не требует авторизации
    next();
  }
})