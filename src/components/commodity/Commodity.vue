<template>
  <div class="commodity-list">
    <!--商品  <router-link :to="'/home/commodity/' + item.id" v-for="item in commodityList" :key="item.id" class="commodity-item" tag="div">
            <img :src="item.img_url" alt="">
            <h4>{{ item.title }}</h4>
            <div class="commodity-info">
                <p class="price">
                    <span class="new">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>冷卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
    </router-link>-->
    <div
      v-for="item in commodityList"
      :key="item.id"
      class="commodity-item"
      @click="goInfo(item.id)"
    >
      <!--编程式跳转-->
      <img :src="item.img_url" alt />
      <h4>{{ item.title }}</h4>
      <div class="commodity-info">
        <p class="price">
          <span class="new">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>冷卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getCommodityList()">加载更多</mt-button>
  </div>
</template>



<script>
export default {
  data() {
    return {
      pageIndex: 1,
      commodityList: []
    };
  },
  created() {
    this.getCommodityList();
  },
  methods: {
    getCommodityList() {
      //注意拼接
      this.$http
        .get("api/getgoods?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            this.commodityList = this.commodityList.concat(result.body.message);
            console.log(this.commodityList);
          } else {
          }
        });
    },
    getMore() {
      //加载更多
      this.pageIndex += 1;
      this.getCommodityList();
    },
    goInfo(id) {
      //使用js跳转 
      this.$router.push("/home/commodity/" + id);
      //如果路由规则家里name属性 。push({ name:"-----", params: {id: --} }) params是接受的参数名字和参数 是对象
    },
  }
};
</script>


<style lang="scss" scoped>
.commodity-list {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  padding-bottom: 0;
  justify-content: space-between;
  .commodity-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 290px;
    width: 49%;
    border: 2px solid rgba(238, 238, 238, 0.664);
    box-shadow: rgba(170, 170, 170, 0.158) 2px 2px;
    margin-bottom: 7px;
    padding: 2px;
    img {
      width: 100%;
    }
    .commodity-info {
      background-color: rgb(221, 221, 221);
      padding-top: 2px;
      p {
        margin: 0;
        font-size: 20px;
      }
      .price {
        .new {
          color: red;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 6px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        margin: 0 3px;
      }
    }
  }
}
</style>