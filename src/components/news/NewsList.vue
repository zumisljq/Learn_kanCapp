<template>
    <div>
        <ul class="mui-table-view mui-table-view-chevron">
				<li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
					<router-link class='mui-navigate-right' :to="'/home/newslist/newsinfo/'+ item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{ item.title }}
							<p class='mui-ellipsis'>
                            <i>userName</i>
                            <span>发表于:{{ item.add_time | dateFormat('YYYY-MM-DD') }}</span><!--使用过滤器 -->
                            <span>点击:{{ item.click }}次</span></p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>



<script>
import { Toast } from 'mint-ui'
import 'mint-ui/lib/Toast/style.css'
export default {
    data() {
        return {
            newsList: [],
        }
    },
    created() {
        this.getNewsList();
    },
    methods: {
        getNewsList(){//吧地址换成变量 方便更改
            this.$http.get('api/getnewslist').then(result => {
                if(result.body.status === 0){
                    // console.log(result.body.message);
                    this.newsList = result.body.message;
                } else {
                    Toast("加载新闻失败");
                }
            });
        },
    },
}
</script>


<style lang="scss" scoped>
.mui-media-body{
   .mui-ellipsis{
       display: flex;
       justify-content: space-between;
       i{
           font-style: normal;
           color: lightblue;
       }
       span{
           font-size: 1px !important; 
       }
   }
}
</style>