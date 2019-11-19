<template>
  <div>
    <!--。。。自己设计的 还行-->

    <div class="card" v-for="(item,i) in commList" :key="item.id">
      <div class="left">
        <van-checkbox v-model="$store.getters.getShopSelectForItem[item.id]" :name="item.id" checked-color="#07c160" @click="changeSelect(item.id)"></van-checkbox>
        <img :src="item.thumb_path" />
      </div>
      <div class="middle">
        <h4>{{ item.title }}</h4>
        <div class="change-num">
          <p>￥{{ item.sell_price }}</p>
          <shopbox :id="item.id" :zcount="$store.getters.getShopCarCount[item.id]"></shopbox>
        </div>
      </div>
      <div class="right">
        <div>XXX</div>
        <div @click="remove(item.id,i)">删除</div>
      </div>
    </div>

    <div class="card">
      <!--结算-->
      <div class="end">
      <div class="end-left">
          <p>总计 (不含运费)</p>
          <p>已勾选商品  {{ $store.getters.getShopSelected }}  件，  总价 <span>￥{{ $store.getters.getAllPirce }}</span></p>
      </div>
      <div class="end-right">
        <mt-button type="danger">结算</mt-button>

      </div>
      </div>
    </div>
  </div>
</template>



<script>
import ShopBox from "../subcomponents/ShopBox.vue";

export default {
  data() {
    return {
      commList: []
    };
  },
  created() {
    this.getShopCarList();
  },
  methods: {
    getShopCarList() {
      //获取商品的ip 拼接一個字符串
      var idArr = [];
      this.$store.state.shopCar.forEach(element => {
        idArr.push(element.id);
      });
      // console.log(idArr);
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.commList = result.body.message;
          } else {
          }
        });
    },
    remove(id, index) {
      //index 先删页面的渲染
      this.commList.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    changeSelect(a){//点击后触发 修改本地数据的方法 然后全部数据再反应过来 
        this.$store.commit("updateSelect",a);
    }
  },
  components: {
    shopbox: ShopBox
  }
};
</script>


<style lang="scss" scoped>
.card {
  display: flex;
  margin: 24px 12px;
  padding: 6px;
  padding-top: 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 8px 12px #ebedf0;
  height: 90px;
  flex-direction: row;
  .left {
    width: 30%;
    display: flex;
    flex-direction: row;
  
    img {
      width: 50px;
      height: 50px;
      margin-top: 2px;
      padding-top: 5px;
      margin-left: 15px;
    }
  }
  .middle {
    width: 60%;
    padding-right: 20px;
    h4 {
      font-size: 13px;
      margin-left: 5px;
      font-weight: 400;
    }
    .change-num {
      margin-top: 10px;
      margin-left: 5px;
      display: flex;
      justify-content: space-between;
      p {
        color: red;
        margin-top: 5px;
        font-size: 18px;
        margin-left: 5px;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    height: 100%;
    color: rgb(128, 128, 128);
    :nth-child(1) {
      display: block;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 0 3px 2px #ebedf0;
      height: 50%;
      padding: 8px 6px;
      font-size: 13px;
      background-color: rgb(197, 206, 255);
      color: rgb(255, 255, 255);
    }
    :nth-child(2) {
      display: block;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 0 3px 2px #ebedf0;
      height: 50%;
      padding: 8px 6px;
      font-size: 13px;
      margin-top: 2px;
      background-color: rgb(255, 173, 173);
      color: rgb(255, 255, 255);
    }
  }
  .end{
      display: flex;
      position: relative;
      justify-content: space-between;
      width: 100%;
      margin: 15px;
      .end-left{
          span{
              color: red;
              font-size: 20px;
              margin-left: 15px;
          }

      }
      .end-right{
          button{
              position: absolute;
              bottom: 2px;
              right: 3px;
          }
      }
  }
}
</style>