import VueRouter from 'vue-router'
//tabbar
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

import PhotosList from './components/photos/PhotosList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'

import Commodity from './components/commodity/Commodity.vue'
import CommodityInfo from './components/commodity/CommodityInfo.vue'
import CommodityDesc from './components/commodity/CommodityDesc.vue'
import CommodityComment from './components/commodity/CommodityComment.vue'

var router = new VueRouter({
    routes: [//路由规则 
        { path: "/", redirect: '/home'},//初始化url
        { path: '/home', component: HomeContainer},
        { path: '/member', component: MemberContainer},
        { path: '/shopcar', component: ShopcarContainer},
        { path: '/search', component: SearchContainer},
        { path: '/home/newslist', component: NewsList},
        { path: '/home/newslist/newsinfo/:id', component: NewsInfo},
        { path: '/home/photoslist', component: PhotosList},
        { path: '/home/photosinfo/:id', component: PhotoInfo},
        { path: '/home/commodity', component: Commodity},
        { path: '/home/commodity/:id', component: CommodityInfo},
        { path: '/home/commoditydesc/:id', component: CommodityDesc},
        { path: '/home/commoditycomment/:id', component: CommodityComment},
    ],
    linkActiveClass: 'mui-active'//覆盖默认的active样式 默认是router-link-active
})

export default router//向外暴露router main来引入