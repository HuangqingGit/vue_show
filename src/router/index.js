import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'

Vue.use(Router)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home
    }
]

const router = new Router({
    routes
})

// 挂在路由守卫
router.beforeEach((to, from, next) => {
    console.log(window.sessionStorage.getItem('token'))
    if (to.path === '/login') return next()
    if (!window.sessionStorage.getItem('token')) return next('/login')
    next()
})

export default router
