import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'




var router = new VueRouter({
    routes: [//路由规则 
        { path: '/home', component: HomeContainer},
        { path: '/member', component: MemberContainer},
        { path: '/shopcar', component: ShopcarContainer},
        { path: '/search', component: SearchContainer},
    ],
    linkActiveClass: 'mui-active'//覆盖默认的active样式 默认是router-link-active
})

export default router//向外暴露router main来引入