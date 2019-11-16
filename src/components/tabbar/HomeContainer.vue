<template>
  <div>
    <!--轮播图-->
    <mt-swipe :auto="4000">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
    <h1>Home Container</h1>
  </div>
</template>



<script>
export default {};
</script>


<style lang="scss" scoped>//sass样式使用
.mint-swipe {
    height: 200px;
}
.mint-swipe-item {
  &:nth-child(1){background-color: lightpink;}
  &:nth-child(2){background-color: lightblue;}
  &:nth-child(3){background-color: lightgreen;}
}
</style>