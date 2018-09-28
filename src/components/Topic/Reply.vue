<template>
  <div class="reply">
    <div class="author_content">
      <img class="avatar"
           :src="reply.author.avatar_url"
           alt="">
      <div class="user_info">
        <span>{{reply.author.loginname}}</span>
        <span>{{floor+1}}楼</span>
        <span>{{calTime(reply.create_at)}}</span>
        <span class="author"
              v-if="reply.author.loginname===authorName">作者</span>
      </div>
      <div class="user_action"
           v-if="this.$store.state.user.loginname">
        <i @click="like"
           class="iconfont"
           :class="isLike?'icon-like-fill':'icon-like'"></i> {{reply.ups.length+temp||'&nbsp;'}}
        <i class="iconfont icon-reply"
           @click="editorHandle"></i>
      </div>
    </div>
    <div ref="replyText"
         class="reply-text">

    </div>

    <reply-publish v-show="editorShow"
                   :topicId=topicId
                   :fetchTopic=fetchTopic
                   :replyId=reply.id
                   :replyName=reply.author.loginname
                   @replyEnd=editorHandle></reply-publish>
  </div>
</template>
<script>
import { calTime } from '../../util/util.js'
import ReplyPublish from './ReplyPublish'
export default {
  data () {
    return {
      editorShow: false,
      isLike: this.reply.ups.includes(this.$store.state.user.id),
      temp: 0
    }
  },
  components: {
    ReplyPublish
  },
  props: {
    reply: Object,
    authorName: String,
    floor: Number,
    topicId: String,
    fetchTopic: Function
  },
  methods: {
    calTime,
    editorHandle () {
      this.editorShow = !this.editorShow
    },
    async like () {
      if (this.reply.author.loginname === this.authorName) {
        this.$vux.toast.text('不能帮自己点赞', 'bottom')
        return
      }
      const fromData = {
        accesstoken: this.$store.state.user.accessToken
      }
      let res = await this.$http.post(`/api/reply/${this.reply.id}/ups`, { ...fromData })
      if (res.status === 200 && res['data']['success']) {
        if (res.data.action === 'up') {
          this.temp = 1
          this.isLike = true
        } else if (res.data.action === 'down') {
          this.temp = -1
          this.isLike = false
        }
      }
    }
  },
  mounted () {
    this.$refs.replyText.innerHTML = this.reply.content
  }
}
</script>
<style lang="less">
.reply {
  margin-top: 10px;
  overflow: hidden;
  .author_content {
    font-size: 12px;
    margin-bottom: 30px;
  }
  .reply-text {
    font-size: 14px;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
    img {
      max-width: 100%;
    }
  }
  .user_action {
    float: right;
  }
  .user_info {
    display: inline-block;
  }
  img.avatar {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    float: left;
    margin-right: 10px;
  }
}
</style>
