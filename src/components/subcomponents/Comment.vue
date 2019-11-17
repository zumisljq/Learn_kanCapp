<template>
  <div>
    <div class="cmt-container">
      <h3>评论</h3>
      <span>comment</span>
      <hr/>
      <!-- 需要效验是否为空  -->
      <textarea cols="30" rows="3" placeholder="请输入评论内容" v-model="msg"></textarea>
      <mt-button size="large" type="primary" @click="postComment">发表评论</mt-button>

      <div class="cmt-list">
        <div v-for="(item,i) in commentList" :key="item.add_time" class="cmt-item">
          <!--评论数据-->
          <div class="cmt-title">
              {{ i + 1 }}楼&nbsp;&nbsp;{{item.user_name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间:{{ item.add_time | dateFormat('YYYY-MM-DD')}}
          </div>
          <div class="cmt-body">{{ item.content }}
          </div>
        </div>
      </div>

      <mt-button size="large" plain type="danger" @click="pageIndexPlus">更多</mt-button>
    </div>
  </div>
</template>



<script>
import { Toast } from "mint-ui";
import "mint-ui/lib/Toast/style.css";
export default {
  data() {
    return {
      pageIndex: 1, //默认第一页的评论数据
      commentList: [],
      msg: ""//和评论框绑定数据
    };
  },
  props: ["id"],//父级拿到的参数 需要用props数组绑定
  created() {
    this.getComments();
  }, // -----------------------------  致 逝去的评论接口---------------------
  methods: {
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          //   console.log(result);
          if (result.body.status === 0) {
            // console.log(result.body.message);
            this.commentList = this.commentList.concat(result.body.message); //拼接！！！
            // console.log(this.commentList);
          } else {
            Toast("获取评论失败！");
          }
        });
    },
    pageIndexPlus() {
      this.pageIndex += 1; //多一页
      this.getComments(); //再加载 需要保持原本的列表 需要concat拼接！！！进去
    },
    
    postComment() {//效验评论内容是否为空
        if (this.msg.trim().length === 0) {
            return Toast("不能为空");
        }
      //上传评论 post
      //参数1 url的请求地址
      //参数2 提交给服务器的数据对象 这个接口只需要content 既{ content： this.msg}
      //参数3 提交的表单格式 
      this.$http.post("api/postcomment/" + this.id, { content: this.msg.trim()})
      .then(function(result){
          if(result.body.status === 0){
              //手动先拼接一個对象
              var cmt = { user_name: "zumis", add_time: Date.now(), content:this.msg.trim()};
              this.commentList.unshift(cmt);
              this.msg = "";

          }
      });//trim清除空格
    }
  }
};
</script>


<style lang="scss" scoped>
.int-toast {
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
    .cmt-item {
      border: 2px solid #ccc;
      margin: 5px 0;

      .cmt-title {
        background-color: #ccc;
        line-height: 40px;
      }
      .cmt-body {
        line-height: 40px !important;
        padding: 5px;
      }
    }
  }
}
</style>