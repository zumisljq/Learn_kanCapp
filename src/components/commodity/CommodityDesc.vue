<template>
    <div class="desc-container">
        <h1>{{ info.title }}</h1>
        <hr>
        <div class="desc-content" v-html="info.content"></div>
    </div>
</template>



<script>
export default {
    data() {
        return {
            info: {},
            
        }
    },
    created() {
        this.getDesc();
    },
    methods: {
        getDesc(){
            this.$http.get('api/goods/getdesc/' + this.$route.params.id).then(result => {
                if(result.body.status === 0){
                    this.info = result.body.message[0];
                } else {}
            })
        }
    },
}
</script>


<style lang="scss">
.desc-container{
.desc-content{
    width: 100%;
    img{
       width: 100%;
    }
}}
</style>