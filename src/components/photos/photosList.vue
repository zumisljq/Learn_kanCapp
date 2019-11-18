<template>
  <div>
    <!-- 顶部滑动条  使用VANT插件 -->
    <van-tabs :animated="true">
      <van-tab v-for="item in ALLImgCategory" :key="item.id">
        <!--这是网上解决tab无法绑定时间的方法 使用2個预定属性的div 把tab标题和内容分成2個div -->
        <div class="tab-title" slot="title" @click="getImgList(item.id)">{{ item.title }}</div>
        <div class="tab-content">
          <!--内容 imgList-->
          <ul>
            <router-link v-for="item in imgList" :key="item.id" :to="'/home/photosinfo/' + item.id" tag="li">
              <img v-lazy="item.img_url" />
              <!--vant的lazyload-->
              <div class="info">
                <h4 class="info-title">{{ item.title }}</h4>
                <div class="info-body">{{ item.zhaiyao }}</div>
              </div>
            </router-link>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>



<script>
// import mui from '../../lib/mui/js/mui.js'//官方文档里使用的mui方法导入 并设置参数
// mui('.mui-scroll-wrapper').scroll({
//     deceleration: 0.0006 ----mui不是严格模式 如不想改webpack模式 就该换插件了！
// });

export default {
  data() {
    return {
      ALLImgCategory: [], //tab分类栏的数据
      imgList: [] //图片 接口需要对应的id参数
    };
  },
  created() {
    this.getAllCategory();
    this.getImgList(0);
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          //   console.log(result.body.message);
          result.body.message.unshift({
            title: "全部内容",
            id: 0
          });
          this.ALLImgCategory = result.body.message;
          console.log(this.ALLImgCategory);
        } else {
        }
      });
    },
    getImgList(a) {
      //点击分类 传入相应的id
      console.log("点击成功！");
      this.$http.get("api/getimages/" + a).then(result => {
        if (result.body.status === 0) {
          this.imgList = result.body.message;
          console.log(this.imgList);
          if (this.imgList.length === 0) {
            this.imgList = [
              {
                id: 998,
                img_url: "../../images/error.jpg",
                title: "请点下一个分类",
                zhaiyao: "嗯阿阿阿阿阿阿阿aaaaaaaaaaaaaaaaaaaaaaa"
              }
            ];
          }
        } else {
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
*{
    z-index: 0;
    
}
a {
  width: 100%;
  height: 100%;
}
ul {
  padding: 10px;
  padding-bottom: 0;
  margin: 0;
  width: 100%;
  li {
    position: relative;
    margin-bottom: 5px;
    width: 100%;
    img {
      width: 100%;
    }
  }
}

.info {
  position: absolute;
  bottom: 0;
  background-color: rgba(204, 204, 204, 0.459);
  text-align: left;
  color: #fff;
  margin-bottom: 5px;
  height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  transition: 0.4s all ease-in-out;
  .info-body {
    font-size: 12px;
  }
  .info-title {
    transition: 0.4s all ease-in-out;
  }
}
li:hover .info {
  transition: 0.4s all ease-in-out;
  height: 200px;
  .info-title {
    font-size: 20px;
  }
}
</style>