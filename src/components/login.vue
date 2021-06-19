<template>
    <div class="login">
        <div class="stars"></div>
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <el-avatar :size="200" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" @error="errorHandler">
                    <img src="../assets/img/logo.png" />
                </el-avatar>
            </div>
            <!-- 登录表单 -->
            <div class="login_mes_box">
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="form1" status-icon>
                    <!-- 用户名 -->
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名/账号">
                            <template #prefix>
                                <iconpark-icon class="el-input__icon" icon-id="16440"></iconpark-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
                            <template #prefix>
                                <iconpark-icon class="el-input__icon" icon-id="16441"></iconpark-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <!-- 提交 -->
                    <el-form-item>
                        <el-button @click="loginVerify" type="primary">提交</el-button>
                        <el-button @click="resetLoginForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 表单数据绑定对象
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            // 表单的验证规则
            loginFormRules: {
                // 验证用户名是否合法
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                ],
                // 验证密码格式是否合法
                password: [
                    // { required: true, message: '请输入登录密码', trigger: 'blur' },
                    // { min: 8, max: 18, message: '长度异常：密码长度必须在 8 到 18 个字符之间', trigger: 'blur' },
                    // {
                    //     pattern: /^.*(?=.{8,18})(?=.*[0-9])(?=.*[A-z])(?=.*[!@#$%^&*?.+-]).*$/,
                    //     message: '格式有误：密码必须包含数字、字母、特殊符号，且需保持在8-18位之间',
                    //     trigger: 'blur'
                    // }
                ]
            }
        }
    },
    mounted () {
        this.wallpaper()
    },
    methods: {
        wallpaper () {
            // 星星的密集程度，数字越大越多
            const density = 800
            // 星星的看起来的距离,值越大越远,可自行调制到自己满意的样子41
            const spacing = 1000
            const starsr = this.$('.stars')
            for (var i = 0; i < density; i++) {
                starsr.append(this.$('<div></div>').addClass('star_item'))
            }
            this.$('.star_item').each(function () {
                var cur = this.$(this)
                var s = 0.2 + (Math.random() * 1)
                var curR = spacing + (Math.random() * 300)
                cur.css({
                    transformOrigin: '0 0 ' + curR + 'px',
                    transform: ' translate3d(0,0,-' + curR + 'px) rotateY(' + (Math.random() * 360) + 'deg) rotateX(' + (Math.random() * -50) + 'deg) scale(' + s + ',' + s + ')'
                })
            })
        },
        errorHandler () {
            return true
        },
        // 表单预验证
        loginVerify () {
            this.$refs.loginFormRef.validate(async valid => {
                if (!valid) return
                const { data: result } = await this.$http.post('login', this.loginForm)
                if (result.meta.status !== 200) return this.$message.error('登录失败：' + result.meta.msg)
                this.$message.success('登录成功')
                window.sessionStorage.setItem('token', result.data.token)
                this.$router.push('/home')
            })
        },
        // 重置表单
        resetLoginForm () {
            this.$refs.loginFormRef.resetFields()
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    background: radial-gradient(
        200% 100% at bottom center,
        #f7f7b6,
        #e96f92,
        #75517d,
        #1b2947
    );
    background: radial-gradient(
        220% 105% at top center,
        #1b2947 10%,
        #75517d 40%,
        #e96f92 65%,
        #f7f7b6
    );
    background-attachment: fixed;
    overflow: hidden;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .stars {
        transform: perspective(500px);
        transform-style: preserve-3d;
        position: absolute;
        bottom: 0;
        perspective-origin: 50% 100%;
        left: 50%;
        animation: rotate 90s infinite linear;
    }

    .login_box {
        width: 700px;
        height: 450px;
        background-color: #fff;
        opacity: 0.85;
        border-radius: 8px;
        padding: 10px;

        .avatar_box {
            width: 200px;
            height: 200px;
            border-radius: 100%;
            background-color: #fff;
            border: 16px solid #fff;
            box-shadow: 0px 0px 22px 0px #75878a;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .login_mes_box {
            width: 100%;
            margin-top: 180px;
            display: flex;
            justify-content: center;
            align-items: center;
            .form1 {
                width: 450px;
                .el-input__icon {
                    color: #c0c4cc;
                }
            }
        }
    }
}

@keyframes rotate {
    0% {
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
    }
    100% {
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
            rotateY(-360deg);
    }
}
</style>

<style>
.star_item {
    width: 2px;
    height: 2px;
    background: #f7f7b6;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0 0 -300px;
    transform: translate3d(0, 0, -300px);
    backface-visibility: hidden;
}
</style>
