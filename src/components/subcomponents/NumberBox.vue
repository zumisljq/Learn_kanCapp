<template>
  <van-stepper v-model="value"  @change="getValueIn(value)" integer :max="max"/>
  <!--哇啊啊啊啊啊啊 意外的简单 都好起来了-->
</template>



<script>
// vant 计数器的组件 只需要父组件给一个方法 this.$emit拿到直接给value就完成了
export default {
    data() {
        return {
            value: 1,
        }
    },
    props: ["max", "max"],//拿到库存最大值
    methods: {
        getValueIn(a){
            this.$emit('getValue',this.value);//拿到方法 给value vant的插件自动检索变化 双向绑定value
        }
    },
};
</script>


<style lang="css" scoped>

</style>