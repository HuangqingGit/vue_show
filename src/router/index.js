import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import Welcome from '../views/welcome.vue'
import Users from '../views/user/users.vue'
import Rights from '../views/power/rights.vue'
import Roles from '../views/power/roles.vue'
import Goods from '../views/goods/goods.vue'
import Params from '../views/goods/params.vue'
import Categories from '../views/goods/categories.vue'
import Orders from '../views/orders/orders.vue'
import Reports from '../views/reports/reports.vue'

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
