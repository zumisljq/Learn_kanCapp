<template>
  <div>
    <!--小球动画！！！！！！！！！！！！！！！-->
    <transition 
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
        <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    

    <!--没用mui 自己写卡片样式-->
    <div class="card">
      <swiper-box :swipePicList="swipePicList"></swiper-box>
      <!--这里宽度期望自适应 -->
    </div>

    <div class="card">
      <h3>{{ commodityInfo.title }}</h3>
      <hr />
      <p>
        <span class="old">市场价：{{ commodityInfo.market_price}}</span>
        <span class="new">销售价:</span>
        <span class="price">￥{{ commodityInfo.sell_price }}</span>
      </p>
      <!--这里使用 mui 的步进器   vant 因为mui样式冲突 mui使用太多固定样式且公用太多属性名字了-->
      <div class="how-many">
        <span>购买数量：</span>
        <number-box @getValue="getValue" :max="commodityInfo.stock_quantity"></number-box><!--给子组件方法 给子调用就可以传值-->
      </div>
      <div>
        <mt-button type="primary" size="small">立即购买</mt-button>
        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
      </div>
    </div>

    <div class="card">
      <h2>商品参数</h2>
      <hr />
      <p>商品序号：{{ commodityInfo.goods_no }}</p>
      <p>库存情况：{{ commodityInfo.stock_quantity }}</p>
      <p>上架时间：{{ commodityInfo.add_time }}</p>
      <hr />
      <div class="btn">
        <mt-button size="large" plain type="primary" @click="goDesc(commodityInfo.id)">图文介绍</mt-button>
        <mt-button size="large" plain type="danger" @click="goComment(commodityInfo.id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>



<script>
import Swiper from "../subcomponents/Swiper.vue";
import "vant/lib/Stepper/index.less";
import NumberBox from "../subcomponents/NumberBox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      swipePicList: [],
      value: 1, //步进器 计数
      commodityInfo: {},
      ballFlag: false,//小球配件
      commodityValue: 1,
    };
  },
  created() {
    this.getPic();
    this.getCommodityInfo();
  },
  methods: {
    getPic() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(element => {
            element.img = element.src;
          });
          this.swipePicList = result.body.message;
        } else {
        }
      });
    },
    getCommodityInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.commodityInfo = result.body.message[0];
        //   console.log(this.commodityInfo);
        } else {
        }
      });
    },
    goDesc(id) {
      this.$router.push("/home/commoditydesc/" + id);
    },
    goComment(id) {
      this.$router.push("/home/commoditycomment/" + id);
    },
    addToShopCar(){//购物车添加 和小球动画
        this.ballFlag = !this.ballFlag;
        console.log(this.commodityValue);
    },
    beforeEnter(el){// ...1
        el.style.transform = "translate(0,0)";
    },
    enter(el,done){//2
        el.offsetWidth;

        const ballPosition = this.$refs.ball.getBoundingClientRect();
        const badgePosition = document.getElementById("badge").getBoundingClientRect();//为了动画效果完美 获取购物车小球目标位置
        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;

        el.style.transform = `translate(${xDist}px,${yDist}px)`;//拼接 完美。。。
        el.style.transition = "all cubic-bezier(0.54, -0.3, 0.56, -0.54)  0.5s"//浏览器改变ease调试
        done();
    },
    afterEnter(el){//3 done
        this.ballFlag = !this.ballFlag;
    },
    getValue(value){
        this.commodityValue = value;
    }
  },
  components: {
    "swiper-box": Swiper,
    "number-box": NumberBox
  }
};
</script>


<style lang="scss" scoped>
.card {
  display: block;
  margin: 24px 12px;
  padding: 24px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 8px 12px #ebedf0;
  
  h3 {
    margin: 0;
    font-weight: 400;
  }
  p {
    .old {
      text-decoration: line-through;
    }
    .new {
      font-size: 18px;
      margin-left: 5px;
    }
    .price {
      font-size: 20px;
      color: rgb(255, 59, 59);
    }
  }
  .how-many {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    color: #323233;

    line-height: 24px;
    background-color: #fff;
    margin-bottom: 10px;
    span {
        position: relative;
      padding: 2px;
      margin-right: 5px;
    }
  }
  .btn {
    button {
      margin-bottom: 10px;
    }
  }
}

/*小球 动画！！！*/
.ball {
    position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  left: 150px;
  top: 450px;
  background-color: rgb(255, 139, 139);
  z-index: 2;
}
</style>