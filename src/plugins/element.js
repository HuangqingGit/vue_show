import Vue from 'vue'
import {
    Button, Avatar, Input, Form, FormItem, Message,
    Container, header, aside, main, Menu, Submenu, MenuItem, MenuItemGroup,
    Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Switch, Tooltip, Pagination, Dialog, Popover, Popconfirm, Select, Option
} from 'element-ui'

// 注册按钮组件
Vue.use(Button)
// 注册头像图片组件
Vue.use(Avatar)
// 注册输入框组件
Vue.use(Input)
// 注册表单组件
Vue.use(Form)
// 注册表单Itme组件
Vue.use(FormItem)
// 注册布局主体组件
Vue.use(Container)
// 注册头部组件
Vue.use(header)
// 注册侧边栏组件
Vue.use(aside)
// 注册Main内容主体组件
Vue.use(main)
// 注册菜单组件
Vue.use(Menu)
// 注册菜单Itme组件
Vue.use(MenuItem)
// 注册菜单ItemGroup组件
Vue.use(MenuItemGroup)
// 注册Main内容主体组件
Vue.use(Submenu)
// 注册面包屑导航栏组件
Vue.use(Breadcrumb)
// 注册面包屑导航栏Itme组件
Vue.use(BreadcrumbItem)
// 注册卡片视图组件
Vue.use(Card)
// 注册栅格布局组件
Vue.use(Row)
Vue.use(Col)
// 注册表格组件
Vue.use(Table)
Vue.use(TableColumn)
// 注册Switch开关组件
Vue.use(Switch)
// 注册Tooltip文字提示
Vue.use(Tooltip)
// 注册分页组件
Vue.use(Pagination)
// 注册对话框组件
Vue.use(Dialog)
// 注册 Popover 弹出框组件
Vue.use(Popover)
// 注册 Popconfirm 气泡确认框组件
Vue.use(Popconfirm)
// 注册 Select 选择器组件
Vue.use(Select)
// 注册 Select Option组件
Vue.use(Option)

// 全局挂载弹窗消息
Vue.prototype.$message = Message
