<template>
  <van-stepper v-model="zcount"  @change="getValueIn()" integer />
</template>



<script>
// vant 购物车的计数器
export default {
    data() {
        return {
        }
    },
    props:["zcount","id"],//接受数量 和 id
    methods: {
        getValueIn(){
            this.$store.commit('updateCount',{ "id": this.id, "count": this.zcount})//
            
        }
    },
};
</script>


<style lang="css" scoped>

</style>