<template>
    <div class="roles">
        <!-- 面包屑导航栏 -->
        <Bar :barName="bar"></Bar>

        <!-- 卡片视图区域 -->
        <el-card>
            <el-col>
                <el-button type="primary" @click="addRolesDialog=true">添加角色</el-button>
            </el-col>
            <el-table :data="rolesList" border stripe height="auto" class="table_box">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row :class="['bdbottom', i1 === 0 ? 'bdtop':'']" v-for="(itme1,i1) in scope.row.children" :key="itme1.id">
                            <!-- 渲染一级权限 -->
                            <el-col :span="4">
                                <el-tag closable @close="removeRightById(scope.row,itme1.id)">{{itme1.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 渲染二级三级权限 -->
                            <el-col :span="20">
                                <!-- 渲染二级权限 -->
                                <el-row :class="[i2 === 0 ? '':'bdtop']" v-for="(itme2,i2) in itme1.children" :key="itme2.id">
                                    <el-col :span="5">
                                        <el-tag closable @close="removeRightById(scope.row,itme2.id)" type="success">{{itme2.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="19">
                                        <el-tag closable @close="removeRightById(scope.row,itme3.id)" type="warning" :class="[i3 === 0 ? '':'bdtop']" v-for="(itme3,i3) in itme2.children"
                                            :key="itme3.id">
                                            {{itme3.authName}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="角色 ID" prop="id" width="100px"></el-table-column>
                <el-table-column width="200px">
                    <template slot="header">
                        <div class="center_box">操 作</div>
                    </template>
                    <template slot-scope="scope">
                        <div class="center_box_but">
                            <el-tooltip class="item" effect="dark" content="编辑用户" placement="top" :enterable="false" :open-delay="500">
                                <el-button type="primary" icon="el-icon-edit" size="small" @click="showRosesDialog(scope.row.id)"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除用户" placement="top" :enterable="false" :open-delay="500">
                                <el-popconfirm placement="left" title="此操作将永久删除此用户，是否继续？" icon="el-icon-warning" @confirm="yesDeleteUser(scope.row.id)">
                                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="small"></el-button>
                                </el-popconfirm>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="权限分配" placement="top" :enterable="false" :open-delay="500">
                                <el-button type="warning" icon="el-icon-setting" size="small" @click="showPowerDialog(scope.row)"></el-button>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 添加角色的对话框 -->
        <el-dialog :visible.sync="addRolesDialog" width="30%" @closed="resetaddRolesForm" :close-on-click-modal="false" v-on:keyup.enter.native="addUserVerify"
            v-on:keyup.esc.native="addRolesDialog=false">
            <template slot="title">
                <span class="dialog-title">
                    <i class="iconfont el-icon-edit"></i>添加角色
                </span>
            </template>
            <span>
                <el-form status-icon ref="addUserFormRef" :model="addUserForm" :rules="FromRules" class="addUserFormRef" label-width="80px">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input type="text" v-model="addUserForm.roleName" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input type="text" v-model="addUserForm.roleDesc" autocomplete="off" clearable></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addRolesDialog=false">取 消</el-button>
                <el-button type="primary" @click="addUserVerify">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑角色的对话框 -->
        <el-dialog :visible.sync="rolesUserDialog" width="30%" @closed="resetRolesForm" :close-on-click-modal="false" v-on:keyup.enter.native="rolesUserVerify"
            v-on:keyup.esc.native="rolesUserDialog=false">
            <template slot="title">
                <span class="dialog-title">
                    <i class="iconfont el-icon-edit"></i>编辑角色
                </span>
            </template>
            <span>
                <el-form status-icon ref="rolesUserFormRef" :model="rolesForm" :rules="FromRules" class="rolesUserFormRef" label-width="80px">
                    <el-form-item label="角色 ID">
                        <el-input type="text" v-model="rolesForm.roleId" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input type="text" v-model="rolesForm.roleName" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input type="text" v-model="rolesForm.roleDesc" autocomplete="off" clearable></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rolesUserDialog=false">取 消</el-button>
                <el-button type="primary" @click="rolesUserVerify">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 权限分配的对话框 -->
        <el-dialog class="power-box" :visible.sync="setPowerDialog" width="50%" @closed="resetPowerForm" :close-on-click-modal="false" v-on:keyup.enter.native="setPowerVerify"
            v-on:keyup.esc.native="setPowerDialog=false">
            <template slot="title">
                <span class="dialog-title">
                    <i class="iconfont el-icon-setting"></i>权限分配
                </span>
            </template>
            <span>
                <el-input placeholder="请输入关键字" v-model="powerTextKey" clearable></el-input>
                <div class="opwerTreeRefBox scroll">
                    <el-tree ref="treeRef" node-key="id" :data="powerLists" :filter-node-method="filterNode" :default-expanded-keys="userPowerID" :default-checked-keys="userPowerID" show-checkbox
                        :props="defaultProps">
                    </el-tree>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setPowerDialog=false">取 消</el-button>
                <el-button type="primary" @click="setPowerVerify">确 定</el-button>
            </span>
        </el-dialog>
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
            bar: { noe: '权限管理', two: '角色列表' },
            // 当前用户ID
            userID: '',
            // 当前用户用于的权限
            userPowerID: [],
            // 添加角色表单
            addUserForm: {
                roleName: '',
                roleDesc: ''
            },
            // 编辑角色表单
            rolesForm: {
                roleId: '',
                roleName: '',
                roleDesc: ''
            },
            // 权限目录筛选Key目录
            powerTextKey: '',
            // 所有权限列表
            powerLists: [],
            // 树型图配置
            defaultProps: {
                children: 'children',
                label: 'authName'
            },
            // 是否显示添加角色弹窗
            addRolesDialog: false,
            // 是否显示角色编辑弹窗
            rolesUserDialog: false,
            // 是否显示权限分配弹窗
            setPowerDialog: false,
            // 角色列表
            rolesList: [],
            // 验证规则
            FromRules: {
                // 验证用户名是否合法
                roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
                ],
                // 验证描述长度是否合法
                roleDesc: [
                    { max: 20, message: '长度应控制在20 个字符以内', trigger: 'blur' }
                ]
            }
        }
    },
    created () {
        this.getRolesLest()
    },
    watch: {
        powerTextKey (val) {
            this.$refs.treeRef.filter(val);
        }
    },
    mounted () {
        this.$('.el-table__body-wrapper').addClass('scroll')
    },
    methods: {
        filterNode (value, data) {
            if (!value) return true;
            return data.authName.indexOf(value) !== -1;
        },
        // 获取角色列表
        async getRolesLest () {
            const { data: res } = await this.$http.get('roles')
            if (res.meta.status !== 200) return this.$message.error('错误：' + res.meta.msg)
            this.rolesList = res.data
        },
        // 确认删除用户
        async yesDeleteUser (id) {
            const { data: res } = await this.$http.delete(`roles/${id}`)
            if (res.meta.status !== 200) return this.$message.error('删除失败：' + res.meta.msg)
            this.$message.success(res.meta.msg)
            this.getRolesLest()
        },
        // 显示角色编辑弹窗并获取角色信息
        async showRosesDialog (id) {
            const { data: res } = await this.$http.get(`roles/${id}`)
            if (res.meta.status !== 200) return this.$message.error('获取失败：' + res.meta.msg)
            this.rolesForm = res.data
            this.rolesUserDialog = true
        },
        // 显示权限分配弹窗并获取权限列表
        async showPowerDialog (row) {
            // 从scope中记录当前打开的用户ID
            this.userID = row.id
            // 从scope中记录当用户的已有权限
            this.getLeafKeys(row, this.userPowerID)
            const { data: res } = await this.$http.get('rights/tree')
            if (res.meta.status !== 200) return this.$message.error('错误：' + res.meta.msg)
            this.powerLists = res.data
            this.setPowerDialog = true
        },
        // 提交添加角色信息
        addUserVerify () {
            this.$refs.addUserFormRef.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.$http.post('roles', this.addUserForm)
                if (res.meta.status !== 201) return this.$message.error('添加失败：' + res.meta.msg)
                this.rolesForm = res.data
                this.$message.success('添加成功')
                this.getRolesLest()
                this.addRolesDialog = false
            })
        },
        // 提交更改角色信息
        rolesUserVerify () {
            this.$refs.rolesUserFormRef.validate(async valid => {
                if (!valid) return
                const { data: res } = await this.$http.put(`roles/${this.rolesForm.roleId}`, { roleName: this.rolesForm.roleName, roleDesc: this.rolesForm.roleDesc })
                if (res.meta.status !== 200) return this.$message.error('更新失败：' + res.meta.msg)
                this.rolesForm = res.data
                this.$message.success('更新成功')
                this.getRolesLest()
                this.rolesUserDialog = false
            })
        },
        // 提交权限分配请求
        async setPowerVerify () {
            const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
            const { data: res } = await this.$http.post(`roles/${this.userID}/rights`, { rids: keys.join(',') })
            if (res.meta.status !== 200) return this.$message.error('更新失败：' + res.meta.msg)
            this.$message.success('权限分配成功')
            this.setPowerDialog = false
            this.getRolesLest()
        },
        // 监听添加角色对话框关闭事件并重置表单
        resetaddRolesForm () {
            this.$refs.addUserFormRef.resetFields()
        },
        // 监听编辑角色对话框关闭事件并重置表单
        resetRolesForm () {
            this.$refs.rolesUserFormRef.resetFields()
        },
        // 监听角色权限分配对话框关闭事件并重置
        resetPowerForm () {
            this.userPowerID = []
        },
        // Object对象取ID值从组Array
        getLeafKeys (node, arr) {
            if (!node.children) {
                return arr.push(node.id)
            }

            node.children.forEach(item => {
                this.getLeafKeys(item, arr)
            });
        },
        // 删除标签权限
        async removeRightById (role, rightId) {
            const confir = await this.$confirm.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if (confir !== 'confirm') return this.$message.info('已取消删除')

            const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
            if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.$message.success(res.meta.msg)
            role.children = res.data
        }
    }
}
</script>

<style lang="less" scoped>
.roles {
    box-sizing: content-box;
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-table {
        margin-top: 15px;
        .el-tag {
            margin: 5px;
        }
    }

    .el-breadcrumb {
        margin-bottom: 15px;
        font-size: 0.85rem;
    }

    .dialog-title {
        color: #606266;
        .iconfont {
            margin-right: 0.9rem;
        }
    }

    .el-card {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .center_box_but {
        display: flex;
        justify-content: space-evenly;
    }

    .bdtop {
        border-top: 1px solid #eee;
    }

    .bdbottom {
        border-bottom: 1px solid #eee;
    }

    .el-row {
        padding: 10px;
        display: flex;
        align-items: center;
    }
}
</style>

<style lang="less">
.roles {
    .el-table td,
    .el-table th {
        text-align: center;
    }

    .el-table__expanded-cell {
        text-align: left !important;
    }

    .power-box {
        display: flex;
        justify-content: center;
        align-items: center;

        .el-input {
            margin-bottom: 15px;
        }

        .el-dialog {
            margin: 0 !important;
        }

        .opwerTreeRefBox {
            height: 550px;
            margin-left: 35px;
            overflow: auto;
        }
    }
}
</style>
