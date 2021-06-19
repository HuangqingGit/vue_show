import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/user/users.vue'
import Rights from '../components/power/rights.vue'
import Roles from '../components/power/roles.vue'
import Goods from '../components/goods/goods.vue'
import Params from '../components/goods/params.vue'
import Categories from '../components/goods/categories.vue'
import Orders from '../components/orders/orders.vue'
import Reports from '../components/reports/reports.vue'

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
            { path: '/roles', component: Roles },
            { path: '/rights', component: Rights },
            { path: '/goods', component: Goods },
            { path: '/params', component: Params },
            { path: '/categories', component: Categories },
            { path: '/orders', component: Orders },
            { path: '/reports', component: Reports }
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
