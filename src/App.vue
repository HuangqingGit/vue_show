<template>
    <div id="app">
        <!-- 路由占位符 -->
        <router-view></router-view>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    name: 'app',
    mounted () {
        window.onresize = function () {
            $('.el-table__body-wrapper').addClass('scroll')
        }
    }
}
</script>

<style>
</style>
