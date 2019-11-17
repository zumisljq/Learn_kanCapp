<template>
<!-- $route.params.id 是获取id的一种方法 这个id是router.js中的地址:id 接受的数据 -->
    <div class="newsinfo">
        <h1 class="title">{{ newsInfo.title }}</h1>
        <p class="subtitle">
            xxxxxx
            <span>{{ newsInfo.add_time | dateFormat }}</span>
            <span>点击: {{ newsInfo.click }}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsInfo.content">

        </div>
        <comment-box :id='this.url_id'></comment-box> <!--this 注意！给子组件传info的id（url.id）值 以获取各个info对应的评论栏-->
    </div>
</template>



<script>
import { Toast } from 'mint-ui'
import 'mint-ui/lib/Toast/style.css'
import Comment from '../subcomponents/Comment.vue'//使用评论组件 要在 export注册
//需要拿url的id 
//判断来使用那个api的数据渲染 
export default {
    data() {
        return {
            url_id: this.$route.params.id, //保存在变量中 方便使用
            newsInfo:{},
        }
    },
    created() {
        this.getNewsInfo();
    },
    methods: {//
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.url_id).then(result => {//记得加上ID变量
                if(result.body.status === 0){
                    // console.log(result.body.message[0]);
                    this.newsInfo = result.body.message[0];
                } else {
                        Toast("获取资料失败");
                }
            })
        }
    },
    components:{
       "comment-box": Comment,
    },
}
</script>


<style lang="scss">
.newsinfo{
    padding: 4px;


}
.title{
    text-align: center;
    color: rgb(168, 168, 168);
    margin: 15px;

}
.subtitle{
    display: flex;
    justify-content: space-between;
    margin: 0px 50px;
    color: rgb(212, 212, 212);
    font-size: 20px;
    span{
        margin-top: 2px;
        font-size: 10px !important;
    }
}
.content{
    img{
        width: 100%;
    }
}
</style>