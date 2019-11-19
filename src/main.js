//入口文件
//vue
import Vue from 'vue';
//先导入路由 安装 再引入router.js
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';
//导入vue-resource 和安装
import VueResource from 'vue-resource';
Vue.use(VueResource);
//2.设置全局的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//3  emulateJSON 请求方法 全局设置post的表单格式
Vue.http.options.emulateJSON = true;

//全局过滤器 使用 moment 需要-S安装
import moment from 'moment';
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
})

//vuex 共享数各个组件的数据 需要创实例  最后的购物车功能 ------------------
import Vuex from 'vuex'
Vue.use(Vuex)

//和本地初始化
var shopCar = JSON.parse(localStorage.getItem('shopCar' || "[]"));

const store = new Vuex.Store({
    state: {
        //存取数据 t组件需要通过this.$store.state.需要取得数据 只要挂载在vm实例 就能使用
        shopCar: shopCar || [], //购物车商品的数据 {id  count  price  selected }

    },
    mutations: {
        //方法 如果要改变数据 建议调用这边的方法 而不是写在组件内 方便管理全部公共的数据改变方法
        // 调用方法不是直接写mutations 而是 this.$store.commit('方法名字')
        //这里的方法第一个值是state 第二个才是commit('需要调用的方法',{要传的值}) 最多2個 第二個可以用对象
        //mutations方法需要使用第二个对象中的值 既 {要传的值}.对象中的属性 来使用
        addToCar(state, commpdity) {
            //如果有了就加数量
            var a = false;
            state.shopCar.some(item => {//some方法 满足就结束遍历
                if (item.id == commpdity.id) {
                    item.count += commpdity.count
                    a = true;
                    return true;
                }
            })
            //没找到 那么！a就是true 就push进去
            if (!a) { state.shopCar.push(commpdity); }
            // console.log(state.shopCar);
            //更新后 需要存储到本地
            localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
        },
        //修改购物车的商品数量
        updateCount(state, ele) {//拿到ele 里面是id：数量 的对象
            state.shopCar.some(item => {
                if (item.id == ele.id) { item.count = ele.count;
                     return true;
                    }//修改数量 改完推出遍历
                
            })
            localStorage.setItem("shopCar", JSON.stringify(state.shopCar));//修改后保存
        },
        removeFormCar(state, id) {
            //根据id删除
            state.shopCar.some((item,i) => {
                if (item.id == id) {
                    state.shopCar.splice(i, 1)
                    return true;
                }
            })
            localStorage.setItem("shopCar", JSON.stringify(state.shopCar));//修改后保存
        },
        updateSelect(state,id){
            state.shopCar.some((item,i) => {
                if (item.id == id) {
                    item.selected = !item.selected;
                    return true;
                }
            })
            localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
        }

    },
    getters: {
        //他不能修改数据 只能获取数据 对外提供数据
        //类如 方法名：function(state){ return "字符串"+state.数据名 } 这样数据位置调用这个函数就自动加上字符串前缀
        //这样之后直接在store也能知道数据是做什么用的
        //要使用这个函数 html里面就可以直接写 {{$store.getters.方法名}}
        //state数据变化就会触发getter的重新求值
        //计算 并随时更新显示
        getAllCount(state) {
            var c = 0;
            state.shopCar.forEach(item => {
                c += item.count;
            })
            return c;//调用就能实时显示购物车所有商品的数量总和
        },
        //本地拿到数据 把 id作为属性 count作为值 拿到一個对象 给购物车填上数量
        getShopCarCount(state) {
            var n = {};
            state.shopCar.forEach(item => {
                n[item.id] = item.count;
            })
            return n;
        },
        getShopSelected(state){//这里想办法先显示  已勾选的数量 
            var s = 0;
            state.shopCar.forEach(item => {
                if(item.selected === true){
                    s++;
                }
            })
            return s;
        },
        getShopSelectForItem(state){
            //这里是给勾选效果的 预设
            var sd = {};
            state.shopCar.forEach(item => {
                sd[item.id] = item.selected
            })
            return sd;
        },
        getAllPirce(state){//选择为true的属性的价格都加起来
            var sum = 0;
            state.shopCar.forEach(item => {//为true 就把计算好的加进去
                if(item.selected === true){
                    sum += item.count * item.price;
                }
            })
            return sum;//输出！！！！！！！！！！！！！！！！！！！！！！！！！！！
        }

    }
})
//-------------------------------------------------------------------------



//主模块 App.vue
import app from './App.vue';


//使用mint-ui组件 这是基于vue的组件 使用按需导入 需要配置插件 具体在mui的文档快速上手按需导入那边
import { Header, Swipe, SwipeItem, Button } from 'mint-ui';
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
import './lib/mui/css/mui.css'  //有冲突 各种冲突 公用属性太多了
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
//  }]
// app.vue tabbar 
// import Tabbar  from 'vant/lib/Tabbar';
// import 'vant/lib/Tabbar/style';
// import TabbarItem  from 'vant/lib/tabbar-item';
// import 'vant/lib/tabbar-item/style';
// Vue.use(Tabbar).use(TabbarItem);
import Tab from 'vant/lib/Tab';//嗯呃阿阿阿阿阿
import 'vant/lib/Tab/style';
import Tabs from 'vant/lib/Tabs';
import 'vant/lib/Tabs/style';
import Lazyload from 'vant/lib/Lazyload';//vant 的懒加载
import 'vant/lib/Lazyload/style';
Vue.use(Tab).use(Tabs).use(Lazyload, {//注册时设置`lazyComponent`选项  加Options loading：str改变加载时候的图片
    loading: "./images/347_6901.png",//嗯呃阿阿阿阿阿 
});
// import ImagePreview from 'vant/lib/image-preview';//这是vant的图片预览组件
// Vue.use(ImagePreview);
import Stepper from 'vant/lib/Stepper';//步进器 Stepper
import 'vant/lib/Stepper/style';
Vue.use(Stepper);
// import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant';
//这是购物车的样式组件  不好用呐  自己建一个
import Checkbox from 'vant/lib/Checkbox';
import 'vant/lib/Checkbox/style';
import CheckboxGroup from 'vant/lib/checkbox-group';
import 'vant/lib/checkbox-group/style';
// import Card  from 'vant/lib/Card';
// import 'vant/lib/Card/style';
// import SubmitBar  from 'vant/lib/submit-bar';
// import 'vant/lib/submit-bar/style';
Vue.use(Checkbox).use(CheckboxGroup)//.use(Card).use(SubmitBar);
// import Switch from 'vant/lib/switch';
// import 'vant/lib/switch/style';
// Vue.use(Switch);






//Vue preview 新版 需要先来个全局样式....
import VuePreview from 'vue-preview'
Vue.use(VuePreview, { tapToClose: true })
import './css/global.css'//缩略图的样式
import { STATUS_CODES } from 'http';










var vm = new Vue({
    el: '#app',

    render: c => c(app),//是func(c){return c(app)}的简写 和路由不同 是直接替换实例中id=app模块
    router,
    store
})