<template>
    <div class="navigationBar">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{barName.noe}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{barName.two}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    props: ['barName']
}
</script>

<style lang="less" scoped>
.navigationBar {
    .el-breadcrumb {
        margin-bottom: 15px;
        font-size: 0.85rem;
    }
}
</style>
