//入口文件
//vue
import Vue from 'vue';
//先导入路由 安装 再引入router.js
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';
//主模块 App.vue
import app from './App.vue';
//使用mui组件 这是基于vue的组件 使用按需导入 需要配置插件 具体在mui的文档快速上手按需导入那边
import { Header,Swipe, SwipeItem } from 'mint-ui';
import 'mint-ui/lib/header/style.css'
import 'mint-ui/lib/swipe/style.css'
import 'mint-ui/lib/swipe-item/style.css'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);//轮播图
Vue.component(SwipeItem.name, SwipeItem);

//使用mui 的tabbar!
import './lib/mui/css/mui.min.css'
//购物车这个破图标需要的css和字体
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'






var vm = new Vue({
    el: '#app',
    
    render: c => c(app),
    router//是func(c){return c(app)}的简写 和路由不同 是直接替换实例中id=app模块
})