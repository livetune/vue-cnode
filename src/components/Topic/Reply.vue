<template>
  <div class="reply">
    <div class="author_content">
      <img :src="reply.author.avatar_url"
           alt="">
      <div class="user_info">
        <span>{{reply.author.loginname}}</span>
        <span>{{calTime(reply.create_at)}}</span>
        <span class="author"
              v-if="reply.author.loginname===author_name">作者</span>
      </div>
      <div class="user_action">
        <i class="iconfont icon-reply"></i>
      </div>
    </div>
    <div ref="replyText"
         class="reply-text">

    </div>
  </div>
</template>
<script>
import { calTime } from '../../util/filter.js'
export default {
  props: {
    reply: Object,
    author_name: String
  },
  methods: {
    calTime
  },
  mounted () {
    this.$refs.replyText.innerHTML = this.reply.content
  }
}
</script>
<style lang="less">
.reply {
  margin-top: 10px;
  .author_content {
    font-size: 12px;
    margin-bottom: 30px;
  }
  .reply-text {
    font-size: 14px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
  .user_action {
    float: right;
  }
  .user_info {
    display: inline-block
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    float: left;
    margin-right: 10px;
  }
}
</style>
