<template>
  <div>
    <!--轮播图-->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in swipePicList" :key="item.id" >
          <img :src="item.img" alt="图片">
      </mt-swipe-item>      <!--连接就不设定了 因为接口数据是他人的-->
    </mt-swipe>
    <!--接下来是表格-->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/item_mini.png" alt="">
		                    <div class="mui-media-body">Home</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/item_mini.png" alt="">
		                    <div class="mui-media-body">Email</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/item_mini.png" alt="">
		                    <div class="mui-media-body">Chat</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/item_mini.png" alt="">
		                    <div class="mui-media-body">location</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/item_mini.png" alt="">
		                    <div class="mui-media-body">Search</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/item_mini.png" alt="">
		                    <div class="mui-media-body">Phone</div></a></li>
		        </ul> 

  </div>
</template>



<script>
import { Toast } from 'mint-ui'//方法需要引入
export default {
    data() {
        return {
            swipePicList: null,
        }
    },
    created() {
        this.getPic();
    },
    methods: {
        getPic(){//使用教程下面评论的api 回头需要学下怎么制作接口 方便自己测试 
            this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result =>{
                if(result.body.status === 0){
                    this.swipePicList = result.body.message;
                } else {
                    Toast("加载轮播图失败")
                }
            })
        }
    },
};
</script>


<style lang="scss" scoped>//sass样式使用
.mint-swipe {
    height: 200px;
}
.mint-swipe-item {
  &:nth-child(1){background-color: lightpink;}
  &:nth-child(2){background-color: lightblue;}
  &:nth-child(3){background-color: lightgreen;}
  img{
      height: 100%;
      width: 100%;
  }
}
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