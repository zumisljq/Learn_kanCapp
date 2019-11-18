<template>
  <div>
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item in swipePicList" :key="item.id">
        <img :src="item.img" alt="图片" :class="{full: isFull}"/><!--为true就加上full这个属性-->
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>



<script>
export default {
    props:['swipePicList', 'isFull']
};
</script>


<style lang="scss" scoped>

.mint-swipe {
    height: 200px;
}
.mint-swipe-item {
    text-align: center;
  img{
      height: 100%;
     
  }
}
.full{//判断用的属性 
    width: 100%;
}
</style>