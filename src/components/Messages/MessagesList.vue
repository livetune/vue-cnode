<template>
  <div class="message-wrapper">
    <img :src="val.author.avatar_url"
         alt=""
         @click="$router.push('/user/'+val.author.loginname)">
    <div class="message-right">
      <h4>{{val.title}}</h4>
      <p class="author-time">
        <span class="author">{{val.author.loginname}} {{val.type==='reply'?'回复了您的话题':'@您'}}</span>
        <span class="time">{{calTime(val.create_at)}}</span>
      </p>
      <div class="content"
           v-html="val.reply.content">
      </div>
      <div class="title"
           @click="$router.push('/topic/'+val.topic.id)">
        {{val.topic.title}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    val: Object,
    calTime: Function
  }
}
</script>
<style lang="less">
.messageList {
  img {
    width: 50px;
    height: 50px;
    border-radius: 15%;
    margin-left: 5px;
  }
  .message-wrapper {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #dad8d8;
  }
  .message-right {
    flex: 1;
    padding: 0 10px 0 15px;
  }
  .author-time {
    font-size: 14px;
    overflow: hidden;
    .time {
      float: right;
      text-align: right;
      width: 25%;
    }
    .author {
      float: left;
      width: 72%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .content {
    margin-top: 6px;
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    * {
      white-space: normal;
      font-size: 14px;
    }
  }
  .title {
    padding: 5px;
    display: block;
    background: #e0e0e0;
    border-radius: 10px
  }
}
</style>
