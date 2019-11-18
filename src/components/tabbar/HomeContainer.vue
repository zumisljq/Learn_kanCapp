<template>
  <div>
    <!--轮播图-->
    <swiper-box :swipePicList = "swipePicList" :itFull="true"></swiper-box><!--换成组件 要用必须传值 设定属性-->
    <!--接下来是表格-->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/newslist">
		                    <img src="../../images/item_mini.png" alt="">
		                    <div class="mui-media-body">NEWS</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/photoslist">
		                    <img src="../../images/item_mini.png" alt="">
		                    <div class="mui-media-body">Photos</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/commodity">
		                    <img src="../../images/item_mini.png" alt="">
		                    <div class="mui-media-body">Commodity</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="#">
		                    <img src="../../images/item_mini.png" alt="">
		                    <div class="mui-media-body">XXXX</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="#">
		                    <img src="../../images/item_mini.png" alt="">
		                    <div class="mui-media-body">XXXX</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/pastEvents">
		                    <img src="../../images/item_mini.png" alt="">
		                    <div class="mui-media-body">Past Events</div></router-link></li>
		        </ul> 

  </div>
</template>



<script>
import { Toast } from 'mint-ui'//方法需要引入
import 'mint-ui/lib/Toast/style.css'

import  Swiper from '../subcomponents/Swiper.vue'

export default {
    data() {
        return {
            swipePicList: null,
            itFull:true,
        }
    },
    created() {
        this.getPic();
    },
    methods: {
        getPic(){//使用教程下面评论的api 回头需要学下怎么制作接口 方便自己测试 
            this.$http.get('api/getlunbo').then(result =>{//设置全局的根路径 Vue.http.options.root = 'http://www.liulongbin.top:3005'
                if(result.body.status === 0){
                    this.swipePicList = result.body.message;
                } else {
                    Toast("加载轮播图失败")
                }
            })
        }
    },
    components:{
        "swiper-box": Swiper,
    }
};
</script>


<style lang="scss" scoped>//sass样式使用

.mui-grid-view.mui-grid-9{
    background-color: transparent;
    border: none;
    img{
        width: 60px;
        height: 60px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none;
}
</style>