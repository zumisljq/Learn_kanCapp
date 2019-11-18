<template>
  <div class="app-container">
    <!--头部 header-->
    <mt-header fixed title="试制 移动端页面"></mt-header>
    <!--路由区域 router-view-->
	<transition name="ssswiperrr">    <!--切换 router-view的 动画效果-->
	<router-view></router-view>
	</transition>
    
    <!-- 底部菜单栏 tabbar MUI组件的                    -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">消息</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>



<script>
</script>


<style scoped>
.app-container{
	padding-top: 40px;
	padding-bottom: 50px;
	overflow-x: hidden;

}
.mint-header{
	background-color: rgb(75, 210, 255);
	z-index: 9;
}
.ssswiperrr-enter-active, .ssswiperrr-leave-active {
	transition:  .5s;
}
.ssswiperrr-enter{ /* 这是VUE的动画方式 标签加上nanme 直接引用 避免v-前缀*/ 
	opacity: 0;
	transform: translateX(100%);/* 进入*/ 
}
.ssswiperrr-leave-to {
	position: absolute;
  	opacity: 0;
  	transform: translateX(-100%);/* 出去*/ 
}
</style>
