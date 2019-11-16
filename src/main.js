//入口文件
//vue
import Vue from 'vue';
//引入router
//import router from './router.js';
//主模块 App.vue
import app from './App.vue';
//使用mui组件 这是基于vue的组件 使用按需导入 需要配置插件 具体在mui的文档快速上手按需导入那边
import { Header } from 'mint-ui';
import 'mint-ui/lib/header/style.css'
Vue.component(Header.name, Header);


//使用mui 的tabbar!
import './lib/mui/css/mui.min.css'







var vm = new Vue({
    el: '#app',
    //rouder,
    render: c => c(app)//是func(c){return c(app)}的简写 和路由不同 是直接替换实例中id=app模块
})