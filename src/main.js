//入口文件
//vue
import Vue from 'vue';
//先导入路由 安装 再引入router.js
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';
//导入vue-resource 和安装
import  VueResource from 'vue-resource';
Vue.use(VueResource);
//2.设置全局的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//3  emulateJSON 请求方法 全局设置post的表单格式
Vue.http.options.emulateJSON = true;

//全局过滤器 使用 moment 需要-S安装
import moment from 'moment';
Vue.filter('dateFormat', function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern);
})



//主模块 App.vue
import app from './App.vue';


//使用mui组件 这是基于vue的组件 使用按需导入 需要配置插件 具体在mui的文档快速上手按需导入那边
import { Header,Swipe, SwipeItem, Button } from 'mint-ui';
import 'mint-ui/lib/header/style.css'
import 'mint-ui/lib/swipe/style.css'
import 'mint-ui/lib/swipe-item/style.css'
import 'mint-ui/lib/button/style.css'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);//轮播图
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
// Vue.use(Lazyload); mint ui 的懒加载太...了 样式不全无法按需 换vant

//使用mui 的tabbar!  photoslist的活动效果需要js 因为mui的js不是严格模式 所以换Vant
import './lib/mui/css/mui.min.css'
//购物车这个破图标需要的css和字体
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'

//Vant  直接手动导入
//import { Tab, Tabs } from 'vant';
//Vue.use(Tab).use(Tabs); 需要添加 这是babel-plugin-import 方法
// ["import", {
//     "libraryName": "vant",
//     "libraryDirectory": "es",
//     "style": true
//   }]
import Tab from 'vant/lib/Tab';//嗯呃阿阿阿阿阿
import 'vant/lib/Tab/style';
import Tabs  from 'vant/lib/Tabs';
import 'vant/lib/Tabs/style';
import Lazyload  from 'vant/lib/Lazyload';//vant 的懒加载
import 'vant/lib/Lazyload/style';
Vue.use(Tab).use(Tabs).use(Lazyload,{//注册时设置`lazyComponent`选项  加Options loading：str改变加载时候的图片
loading: "./images/347_6901.png",//嗯呃阿阿阿阿阿 
});   
// import ImagePreview from 'vant/lib/image-preview';//这是vant的图片预览组件
// Vue.use(ImagePreview);
import VuePreview from 'vue-preview'//Vue preview 新版 需要先来个全局样式....
Vue.use(VuePreview,{tapToClose: true})
import './css/global.css'//缩略图的样式





var vm = new Vue({
    el: '#app',
    
    render: c => c(app),
    router//是func(c){return c(app)}的简写 和路由不同 是直接替换实例中id=app模块
})