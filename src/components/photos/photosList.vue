<template>
  <div>
    <!-- 顶部滑动条  使用VANT插件 -->
    <van-tabs>
      <van-tab v-for="index in 8" :key="index" :title="'标签' + index">内容 {{ index }}</van-tab>
    </van-tabs>
  </div>
</template>



<script>
// import mui from '../../lib/mui/js/mui.js'//官方文档里使用的mui方法导入 并设置参数
// mui('.mui-scroll-wrapper').scroll({
//     deceleration: 0.0006 ----mui不是严格模式 如不想改webpack模式 就该换插件了！
// });

export default {};
</script>


<style lang="css" scoped>
</style>