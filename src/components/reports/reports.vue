<template>
    <div class="reports">
        <!-- 面包屑导航栏 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>

        </el-card>
    </div>
</template>

<style lang="less" scoped>
.reports {
    box-sizing: content-box;
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-breadcrumb {
        margin-bottom: 15px;
        font-size: 0.85rem;
    }

    .el-card {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
}
</style>
