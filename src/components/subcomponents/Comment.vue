<template>
  <div>
    <div class="cmt-container">
      <h3>评论</h3>
      <span>comment</span>
      <hr />
      <textarea cols="30" rows="3" placeholder="请输入评论内容"></textarea>
      <mt-button size="large" type="primary">发表评论</mt-button>

      <div class="cmt-list">
        <div v-for="(item,i) in commentList" :key="item.id" class="cmt-item">
          <!--评论数据-->
          <div
            class="cmt-title"
          >{{ i + 1 }}楼&nbsp;&nbsp;匿名用户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间:{{ item.add_time }}</div>
          <div class="cmt-body">{{ item.content }}</div>
        </div>
      </div>

      <mt-button size="large" plain type="danger" @click="pageIndexPlus">更多</mt-button>
    </div>
  </div>
</template>



<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1, //默认第一页的评论数据
      commentList: [
          {id: 1,add_time:'9102-11-18',content:'因为没有接口所以出现的评论 data有9個数据 1到9 使用column-reverse倒序'},
          {id: 2,add_time:'9102-11-18',content:'因为没有接口所以出现的评论 data有9個数据 1到9 使用column-reverse倒序'},
          {id: 3,add_time:'9102-11-18',content:'因为没有接口所以出现的评论 data有9個数据 1到9 使用column-reverse倒序'},
          {id: 4,add_time:'9102-11-18',content:'因为没有接口所以出现的评论 data有9個数据 1到9 使用column-reverse倒序'},
          {id: 5,add_time:'9102-11-18',content:'因为没有接口所以出现的评论 data有9個数据 1到9 使用column-reverse倒序'},
          {id: 6,add_time:'9102-11-18',content:'因为没有接口所以出现的评论 data有9個数据 1到9 使用column-reverse倒序'},
          {id: 7,add_time:'9102-11-18',content:'因为没有接口所以出现的评论 data有9個数据 1到9 使用column-reverse倒序'},
          {id: 8,add_time:'9102-11-18',content:'因为没有接口所以出现的评论 data有9個数据 1到9 使用column-reverse倒序'},
          {id: 9,add_time:'9102-11-18',content:'因为没有接口所以出现的评论 data有9個数据 1到9 使用column-reverse倒序'}
      ] //接口死了哈 自己自建评论
    };
  },
//   created() {
//     this.getComments();
//     Toast("获取评论失败！");
//   },    -----------------------------  致 逝去的评论接口---------------------
  methods: {
    // getComments() {
    //   this.$http
    //     .get("api/getcomments/" + this.url_id + "?pageindex=" + this.pageIndex)
    //     .then(result => {
    //       console.log(result);
    //       if (result.body.status === 0) {
    //         console.log(result.body.message);
    //         this.commentList.comcat(result.body.message); 拼接！！！
    //       } else {
    //         Toast("获取评论失败！");
    //       }
    //     });
    // }
    pageIndexPlus(){
        this.pageIndex += 1;//多一页
        this.getComments();//再加载 需要保持原本的列表 需要push拼接！！！进去
    }
  }
};
</script>


<style lang="scss" scoped>
.int-toast{
    position: absolute;
    z-index: 99;
}
.cmt-container {
  h3 {
    color: rgb(117, 117, 117);
  }
  span {
    color: #ccc;
  }
  textarea {
    padding: 15px;
    margin: 0;
  }

  .cmt-list {
    margin: 10px 0;  
    display: flex;
    flex-direction: column-reverse;/*倒序！ 排列 */
    .cmt-item {
      border: 2px solid #ccc;
      margin: 5px 0;
    
      .cmt-title {
        background-color: #ccc;
        line-height: 40px;}
    .cmt-body {
        line-height: 40px !important;
          padding:  5px;
         
        }
      
    }
  }
}
</style>