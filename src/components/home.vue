<template>
    <!-- home 主体 -->
    <el-container class="home_container">
        <!-- header区域 -->
        <el-header>
            <div>
                <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" @error="errorHandler">
                    <img src="../assets/img/logo.png" />
                </el-avatar>
                <span class="head_title">电商后台管理系统</span>
            </div>
            <el-button @click="logout" type="primary">退出</el-button>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏区域 -->
            <el-aside :width='isCollapse ? "64px" : "200px"'>
                <!-- 侧边栏菜单区域 -->
                <div class="toggle-button" @click="collApse">|||</div>
                <el-menu :default-active="activePath" :style="isCollapse ? 'width:64px':'width:200px'" background-color="#333741" text-color="#fff" active-text-color="#409eff" unique-opened
                    :collapse="isCollapse" router>
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.path" v-for="item in MenuList" :key="item.id">
                        <!-- 菜单模板 -->
                        <template slot="title">
                            <i class="classIcon iconfont" :class="iconsObj[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/'+item2.path" v-for="item2 in item.children" :key="item2.id" @click="saveNavState('/'+item2.path)">
                            <template slot="title">
                                <i class="classIcon iconfont" :class="iconsObj[item2.id]"></i>
                                <span>{{item2.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体 -->
            <el-main class="main_box">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import $ from 'jquery'
export default {
    data () {
        return {
            // 屏幕高度
            height: $(window).height(),
            // 屏幕宽度
            width: $(window).width(),
            // 菜单列表
            MenuList: '',
            // 是否折叠菜单栏
            isCollapse: false,
            // 被激活的路由
            activePath: '',
            // 菜单列表Icon编码
            iconsObj: {
                125: 'show-icon-yonghuguanli3',
                103: 'show-icon-quanxianguanli4',
                101: 'show-icon-shangpinguanli',
                102: 'show-icon-guanli1',
                145: 'show-icon-tongji1',
                110: 'show-icon-yonghuliebiao3',
                111: 'show-icon-yonghuliebiao3',
                112: 'show-icon-quanxianguanli',
                104: 'show-icon-shangpinliebiao2',
                115: 'show-icon-canshu',
                121: 'show-icon-guanli',
                107: 'show-icon-dingdanguanli-',
                146: 'show-icon-shuju'
            }
        }
    },
    // 编译前调用
    created () {
        this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
        $('.main_box').css('height', this.height - 60 + 'px');
        $(window).resize(function () {
            this.widthw = $(window).width();
            this.height = $(window).height();
            $('.main_box').css('height', this.height - 60 + 'px');
        });
    },
    // 编译后调用
    mounted () { },
    methods: {
        // 获取头像错误函数
        errorHandler () {
            return true
        },
        // 退出登录
        logout () {
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        // 获取菜单目录
        async getMenuList () {
            const { data: res } = await this.$http.get('menus')
            if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
            this.MenuList = res.data
        },
        // 展开与折叠菜单栏
        collApse () {
            this.isCollapse = !this.isCollapse
        },
        // 二级菜单路由跳转
        saveNavState (Nav) {
            window.sessionStorage.setItem('activePath', Nav)
            this.activePath = Nav
        }
    }
}
</script>

<style lang="less" scoped>
.home_container {
    height: 100%;
    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        -moz-user-select: none;
        -khtml-user-select: none;
        > div {
            display: flex;
            justify-content: center;
            align-items: center;

            > .el-avatar {
                box-shadow: 0 0 4px 2px #eaedf1;
            }

            > .head_title {
                margin-left: 15px;
                color: #fff;
                font-size: 1.18rem;
            }
        }
    }
    .el-aside {
        background-color: #333741;
        user-select: none;
        -moz-user-select: none;
        -khtml-user-select: none;
        .el-menu {
            border-right: none;
        }
    }
    .el-main {
        background-color: #eaedf1;
    }

    .toggle-button {
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
    .el-aside:not(.el-menu--collapse),
    .el-main:not(.el-menu--collapse) {
        transition: all 0.3s;
        -webkit-transition: all 0.3s;
        transition-timing-function: linear;
        -webkit-transition-timing-function: linear;
    }
}

.classIcon {
    margin-right: 10px;
    font-size: 1.2rem;
    color: #ffffff;
}
</style>
