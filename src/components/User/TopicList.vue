<template>
  <div class="topic-wrapper">
    <img :src="val.author.avatar_url"
         alt="">
    <div class="topic-right">
      <h4>{{val.title}}</h4>
      <p class="author-time">
        <span class="author">{{val.author.loginname}}</span>
        <span class="time">{{calTime(val.last_reply_at)}}</span>
      </p>
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
.topicList {
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 15px;
  }
  .topic-wrapper {
    display: flex;
    align-items: center;
    margin-top: 10px;
    border-bottom: 1px solid #dad8d8;
  }
  .topic-right {
    flex: 1;
    padding: 0 20px;
  }
  .author-time {
    .time {
      float: right;
    }
  }
}
</style>
