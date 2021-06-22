<template>
    <div class="reports">
        <!-- 面包屑导航栏 -->
        <Bar :barName="bar"></Bar>

        <!-- 卡片视图区域 -->
        <el-card>

        </el-card>
    </div>
</template>

<script>
import Bar from '../../components/navigationBar.vue'
export default {
    // 注册导航栏子组件
    components: {
        Bar
    },
    data () {
        return {
            bar: { noe: '数据管理', two: '数据报表' }
        }
    }
}
</script>

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
