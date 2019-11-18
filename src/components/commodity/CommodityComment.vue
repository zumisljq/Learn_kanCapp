<template>
    <div>
        <comment-box :id="$route.params.id"></comment-box>
    </div>
</template>



<script>
import Comment from '../subcomponents/Comment.vue'

export default {
    components:{
       "comment-box": Comment,
    },
}
</script>


<style lang="css" scoped>
    
</style>