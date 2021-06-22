<template>
    <div class="rights">
        <!-- 面包屑导航栏 -->
        <Bar :barName="bar"></Bar>

        <!-- 卡片视图区域 -->
        <el-card>
            <el-table :data="powerLists" border stripe height="auto" class="table_box">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="权限名称" prop="authName"></el-table-column>
                <el-table-column label="权限 ID" prop="id"></el-table-column>
                <el-table-column label="权限路径" prop="path"></el-table-column>
                <el-table-column label="权限等级" prop="level">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                        <el-tag v-if="scope.row.level === '1'" type="success">二级</el-tag>
                        <el-tag v-if="scope.row.level === '2'" type="warning">三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
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
            bar: { noe: '权限管理', two: '权限列表' },
            // 权限列表数组
            powerLists: []
        }
    },
    created () {
        this.getPowerList()
    },
    mounted () {
        this.$('.el-table__body-wrapper').addClass('scroll')
    },
    methods: {
        // 获取所有权限列表
        async getPowerList () {
            const { data: res } = await this.$http.get('rights/list')
            if (res.meta.status !== 200) return this.$message.error('错误：' + res.meta.msg)
            this.powerLists = res.data
        }
    }
}
</script>

<style lang="less" scoped>
.rights {
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

<style lang="less">
.rights {
    .el-table td,
    .el-table th {
        text-align: center !important;
    }
}
</style>
