<template>
    <div class="users">
        <!-- 面包屑导航栏 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 主要业务区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入用户名" v-model="queryInfo.query" clearable @clear="getUserList" v-on:keyup.enter.native="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addUserDialog = true">
                        <i class="classIcon iconfont show-icon-tianjiayonghu"></i>添加用户
                    </el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="userlist" border stripe height="auto" class="table_box">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="姓 名" prop="username" min-width="120px"></el-table-column>
                <el-table-column label="角 色" prop="role_name" min-width="120px"></el-table-column>
                <el-table-column label="邮 箱" prop="email" min-width="190px"></el-table-column>
                <el-table-column label="电 话" prop="mobile" min-width="120px"></el-table-column>
                <el-table-column width="80px">
                    <template slot="header">
                        <div class="center_box">状 态</div>
                    </template>
                    <template slot-scope="scope">
                        <div class="center_box">
                            <el-switch v-model="scope.row.mg_state" @change="Switch_status(scope.row)"></el-switch>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="200px">
                    <template slot="header">
                        <div class="center_box">操 作</div>
                    </template>
                    <template slot-scope="scope">
                        <div class="center_box_but">
                            <el-tooltip class="item" effect="dark" content="编辑用户" placement="top" :enterable="false" :open-delay="500">
                                <el-button type="primary" icon="el-icon-edit" size="small" @click="showEditDialog(scope.row.id)"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除用户" placement="top" :enterable="false" :open-delay="500">
                                <el-popconfirm placement="left" title="此操作将永久删除此用户，是否继续？" icon="el-icon-warning" @confirm="yesDeleteUser(scope.row.id)">
                                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="small"></el-button>
                                </el-popconfirm>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="权限分配" placement="top" :enterable="false" :open-delay="500">
                                <el-popover placement="left" width="160" :value="levelUserPopover" @show="levelUserPopover=true">
                                    <div class="userLever_box">角色分配</div>
                                    <el-select v-model="userListSelect.roleName" :placeholder="scope.row.role_name" @change="submitNewRole(scope.row.id,$event)" size="small">
                                        <el-option v-for="item in userListSelect" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
                                    </el-select>
                                    <el-button slot="reference" type="warning" icon="el-icon-setting" size="small" @click="getRoleList(scope.row.id)"></el-button>
                                </el-popover>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 页脚分页区域 -->
            <div class="pagination_box">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[10, 20, 30, 40, 50]"
                    :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-card>

        <!-- 添加用户的对话框 -->
        <el-dialog :visible.sync="addUserDialog" width="30%" @closed="resetAddUserForm" :close-on-click-modal="false" v-on:keyup.enter.native="addUserVerify"
            v-on:keyup.esc.native="addUserDialog=false">
            <template slot="title">
                <span class="dialog-title">
                    <i class="iconfont show-icon-tianjiayonghu"></i>添加用户
                </span>
            </template>
            <span>
                <el-form status-icon ref="addUserFormRef" :model="addUserFrom" :rules="FromRules" class="addUserForm" label-width="70px">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="addUserFrom.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="addUserFrom.password" autocomplete="off" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addUserFrom.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="mobile">
                        <el-input v-model.number="addUserFrom.mobile"></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addUserDialog=false">取 消</el-button>
                <el-button type="primary" @click="addUserVerify">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改用户的对话框 -->
        <el-dialog :visible.sync="editUserDialog" width="30%" @closed="resetEditUserForm" :close-on-click-modal="false" v-on:keyup.enter.native="editUserVerify"
            v-on:keyup.esc.native="editUserDialog=false">
            <template slot="title">
                <span class="dialog-title">
                    <i class="iconfont el-icon-edit"></i>编辑用户
                </span>
            </template>
            <span>
                <el-form status-icon ref="editUserFormRef" :model="editUserFrom" :rules="FromRules" class="editUserForm" label-width="60px">
                    <el-form-item label="用户名">
                        <el-input type="text" v-model="editUserFrom.username" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile">
                        <el-input type="text" v-model="editUserFrom.mobile" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="text" v-model="editUserFrom.email" clearable></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editUserDialog=false">取 消</el-button>
                <el-button type="primary" @click="editUserVerify">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 获取用户列表请求参数
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 20
            },
            // 用户列表
            userlist: [],
            // 角色列表下拉选项
            userListSelect: [],
            // 全部页数
            total: 0,
            // 是否显示添加用户Dialog
            addUserDialog: false,
            // 是否显示修改用户Dialog
            editUserDialog: false,
            // 是否显示权限分配Popover
            levelUserPopover: false,
            // 添加用户表单数据
            addUserFrom: {
                username: 'qwertty',
                password: 'admin123..+',
                email: '1666385076@qq.com',
                mobile: '18780839713'
            },
            // 修改用户表单数据
            editUserFrom: {},
            // 表单验证规则（共用）
            FromRules: {
                // 验证用户名是否合法
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                ],
                // 验证密码格式是否合法
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 8, max: 18, message: '长度异常：密码长度必须在 8 到 18 个字符之间', trigger: 'blur' },
                    {
                        pattern: /^.*(?=.{8,18})(?=.*[0-9])(?=.*[A-z])(?=.*[!@#$%^&*?.+-]).*$/,
                        message: '格式有误：密码必须包含数字、字母、特殊符号，且需保持在8-18位之间',
                        trigger: 'blur'
                    }
                ],
                // 验证邮箱格式是否合法
                email: [
                    { required: true, message: '请输入Email', trigger: 'blur' },
                    { min: 8, max: 26, message: '长度异常：Email地址长度必须保持在 8 到 26 个字符之间', trigger: 'blur' },
                    {
                        pattern: /^[A-Za-z0-9]+([_/.][A-Za-z0-9]+)*@([A-Za-z0-9/-]+\.)+[A-Za-z]{2,6}$/,
                        message: '格式有误：示例：xxxxx@xx.xxx',
                        trigger: 'blur'
                    }
                ],
                // 验证电话号码格式是否合法
                mobile: [
                    { required: true, message: '请输入电话号码！', trigger: 'blur' },
                    {
                        pattern: /^(13[0-9]|14[014-9]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                        message: '格式有误：应当由11位纯数字组成',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    created () {
        this.getUserList()
    },
    mounted () {
        this.$('.el-table__body-wrapper').addClass('scroll')
    },
    methods: {
        // 获取用户列表
        async getUserList () {
            const { data: res } = await this.$http.get('users', { params: this.queryInfo })
            if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
            this.userlist = res.data.users
            this.total = res.data.total
        },
        // 监听单页最大显示数量改变事件
        handleSizeChange (newSize) {
            this.queryInfo.pagesize = newSize
            this.getUserList()
        },
        // 监听页码改变事件
        handleCurrentChange (newPage) {
            this.queryInfo.pagenum = newPage
            this.getUserList()
        },
        // 修改用户状态
        async Switch_status (ev) {
            const { data: res } = await this.$http.put(`users/${ev.id}/state/${ev.mg_state}`, { params: this.queryInfo })
            if (res.meta.status !== 200) {
                ev.mg_state = !ev.mg_state
                return this.$message.error(res.meta.msg)
            } else {
                return this.$message.success(res.meta.msg)
            }
        },
        // 添加用户表单预验证及请求
        async addUserVerify () {
            this.$refs.addUserFormRef.validate(async valid => {
                if (!valid) return
                const { data: result } = await this.$http.post('users', this.addUserFrom)
                if (result.meta.status !== 201) return this.$message.error('创建失败：' + result.meta.msg)
                this.$message.success(result.meta.msg)
                this.getUserList()
                this.addUserDialog = false
            })
        },
        // 修改用户表单预验证及请求
        editUserVerify () {
            this.$refs.editUserFormRef.validate(async valid => {
                if (!valid) return
                const { data: result } = await this.$http.put(`users/${this.editUserFrom.id}`, this.editUserFrom)
                if (result.meta.status !== 200) return this.$message.error('更新失败：' + result.meta.msg)
                this.$message.success(result.meta.msg)
                this.getUserList()
                this.editUserDialog = false
            })
        },
        // 监听添加用户对话框关闭事件并重置表单
        resetAddUserForm () {
            this.$refs.addUserFormRef.resetFields()
        },
        // 监听修改用户对话框关闭事件重置表单
        resetEditUserForm () {
            this.$refs.editUserFormRef.resetFields()
        },
        // 编辑用户并读取用户信息
        async showEditDialog (id) {
            const { data: res } = await this.$http.get(`users/${id}`)
            if (res.meta.status !== 200) return this.$message.error('获取用户信息失败!')
            this.editUserFrom = res.data
            this.editUserDialog = true
        },
        // 确认删除用户
        async yesDeleteUser (id) {
            const { data: res } = await this.$http.delete(`users/${id}`)
            if (res.meta.status !== 200) return this.$message.error('删除失败：' + res.meta.msg)
            this.$message.success(res.meta.msg)
            this.getUserList()
        },
        // 获取角色列表
        async getRoleList (row) {
            const { data: res } = await this.$http.get('roles')
            if (res.meta.status !== 200) return this.$message.error('错误：' + res.meta.msg)
            this.userListSelect = res.data
        },
        // 提交用户角色分配
        async submitNewRole (id, e) {
            this.levelUserPopover = false
            const { data: res } = await this.$http.put(`users/${id}/role`, { rid: e })
            if (res.meta.status !== 200) return this.$message.error('分配失败：' + res.meta.msg)
            this.$message.success('角色分配成功')
            this.getUserList()
        }
    }
}
</script>

<style lang="less" scoped>
.users {
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

    .el-table {
        margin-top: 10px;
        font-size: 0.85rem;
    }

    .dialog-title {
        color: #606266;
        .iconfont {
            margin-right: 0.9rem;
        }
    }
    .pagination_box {
        margin-top: 10px;
        display: flex;
        justify-content: center;
    }

    .center_box {
        display: flex;
        justify-content: center;
    }

    .center_box_but {
        display: flex;
        justify-content: space-evenly;
    }
}

.userLever_box {
    margin-bottom: 0.4rem;
    color: #606266;
}

.classIcon {
    margin-right: 5px;
    font-size: 1.1rem;
}
</style>

<style lang="less">
.el-card {
    > .el-card__body {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
}
</style>
