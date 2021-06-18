import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/user/users.vue'

Vue.use(Router)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/users', component: Users },
            { path: '/roles', component: Users },
            { path: '/rights', component: Users },
            { path: '/goods', component: Users },
            { path: '/params', component: Users },
            { path: '/categories', component: Users },
            { path: '/orders', component: Users },
            { path: '/reports', component: Users }
        ]
    }
]

const router = new Router({
    routes
})

// 挂在路由守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    if (!window.sessionStorage.getItem('token')) return next('/login')
    next()
})

export default router
