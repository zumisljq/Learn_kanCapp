<template>
  <div>
    <h2 class="title">{{ photoInfo.title }}</h2>
    <p class="subtitle">
      xxxxxx
      <span>{{ photoInfo.add_time | dateFormat }}</span>
      <span>点击: {{ photoInfo.click }}次</span>
    </p>
    <hr/>
    <!--缩略图 样式在全局的css里面 方法只加了一個点击关闭的属性-->
    <div class="view-img">
    <vue-preview :slides="viewList" ></vue-preview>
    </div>
    <hr/>
    <!--body-->
    <div v-html="photoInfo.content"></div>
    
    <!--评论-->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>



<script>
import Comment from '../subcomponents/Comment.vue'

export default {
    
    data() {
        return {
            id: this.$route.params.id,
            photoInfo: {},
            viewList: [],//vant 的缩略图预览 需要一個数组
        }
    },
    created() {
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods: {
        getPhotoInfo(){
            this.$http.get("api/getimageInfo/" + this.id).then(result => {
                if(result.body.status === 0 ){
                    this.photoInfo = result.body.message[0];
                    // console.log(this.photoInfo);
                } else {
                    //
                }
            })
        },
        getThumbs(){
            //缩略图获取
            this.$http.get("api/getthumimages/" + this.id).then(result => {
                if(result.body.status === 0 ){
                    result.body.message.forEach(element => {//应接口要求 需要加上2個属性
                        element.w = 600;
                        element.h = 400;
                        element.msrc= element.src;//这个是新版的 需要msrc 来显示小图
                    });
                  
                    this.viewList = result.body.message;
                      console.log(this.viewList);
                } else {}
            })
        },
    },
    components:{
       "comment-box": Comment,
    },
    
}
</script>

<style lang="css" scoped>
.view-img{
    width: 100%;
    height: 200px;
}
*{
    margin: 5px;
}
</style>