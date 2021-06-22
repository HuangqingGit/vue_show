<template>
    <div class="categories">
        <!-- 面包屑导航栏 -->
        <Bar :barName="bar"></Bar>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 按钮 -->
            <el-col>
                <el-button type="primary">添加分类</el-button>
            </el-col>
            <!-- 表格 -->
            <el-table v-loading="loading" element-loading-text="正则获取商品分类" element-loading-background="rgba(255, 255, 255, 0.5)" empty-text=" "
                row-key="cat_id" :data="cateList" height="auto" :indent=20 border>
                <el-table-column label="#" type="index"><template slot-scope="scope">{{scope.row.cat_index}}</template></el-table-column>
                <el-table-column label="分类名称" prop="cat_name" class-name="left_text" label-class-name="center_text"></el-table-column>
                <el-table-column label="是否生效" width="100px">
                    <template slot-scope="scope">
                        <i :class="['icon', scope.row.cat_deleted ? 'el-icon-error':'el-icon-success']"
                            :style="!scope.row.cat_deleted ? 'color:#67c23a':'color:#f56c6c'"></i>
                    </template>
                </el-table-column>
                <el-table-column label="分类排序" width="120px">
                    <template slot-scope="scope">
                        <el-tag effect="dark" size="small" v-if="scope.row.cat_level === 0">一级</el-tag>
                        <el-tag effect="dark" size="small" v-if="scope.row.cat_level === 1" type="success">二级</el-tag>
                        <el-tag effect="dark" size="small" v-if="scope.row.cat_level === 2" type="warning">三级</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="更多操作" width="220px">
                    <template>
                        <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 页脚分页区域 -->
            <div class="pagination_box">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
                    :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
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
            // 导航栏title
            bar: { noe: '商品管理', two: '商品分类' },
            // 查询参数
            queryInfo: { type: 3, pagenum: 1, pagesize: 15 },
            // 分类列表数据
            cateList: [],
            // 全部页数
            total: 0,
            // 懒加载状态
            loading: true
        }
    },
    created () {
        this.getCategories()
    },
    mounted () {
        this.$('.el-table__body-wrapper').addClass('scroll')
    },
    methods: {
        // 获取所有商品分类数据
        async getCategories () {
            const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
            if (res.meta.status !== 200) return this.$message.error('错误：' + res.meta.msg)
            this.cateList = this.dataHandle(res.data.result)
            this.total = res.data.total
            this.loading = false
        },
        // 原素数据处理添加一个一级索引index
        dataHandle (da) {
            da.forEach((mod, index) => {
                mod.cat_index = index + 1
            });
            return da
        },
        // 监听单页最大显示数量改变事件
        handleSizeChange (newSize) {
            this.queryInfo.pagesize = newSize
            this.loading = true
            this.getCategories()
        },
        // 监听页码改变事件
        handleCurrentChange (newPage) {
            this.queryInfo.pagenum = newPage
            this.loading = true
            this.getCategories()
        }
    }
}
</script>

<style lang="less" scoped>
.categories {
    box-sizing: content-box;
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-breadcrumb {
        margin-bottom: 15px;
        font-size: 0.85rem;
    }

    .el-table {
        margin-top: 15px;
        .el-tag {
            margin: 5px;
        }
    }

    .el-card {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .icon {
        font-size: 1.1rem;
    }

    .pagination_box {
        margin-top: 10px;
        display: flex;
        justify-content: center;
    }
}
</style>

<style lang="less">
.categories {
    .el-table td,
    .el-table th {
        text-align: center;
    }
}
</style>
