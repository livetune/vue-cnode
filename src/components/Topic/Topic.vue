<template>
  <div class="topic"
       style="padding: 15px 18px;">
    <h2 class="topic-title">{{topicData.title}}</h2>
    <div class="topic-msg">
      <div class="left">
        <img :src="topicData.author.avatar_url||''"
             alt="">
        <div>
          <p>{{topicData.author.loginname}}</p>
          <p>{{create_at}}</p>
        </div>
      </div>
      <div class="right">
        <p class="tag">{{tag}}</p>
        <p>{{topicData.visit_count}} 次浏览</p>
      </div>
    </div>
    <div ref="content"
         class="markdown-body">
    </div>
    <h4 class="reply_count">
      <b>{{topicData.reply_count}}</b> 回复</h4>
    <div class="reply-wrapper"
         v-for="(val,key) in topicData.replies"
         :key=val.id>

      <reply :floor=key
             :reply=val
             :author_name=topicData.author.loginname
             :topicId=topicId
             :fetchTopic=fetchTopic></reply>
    </div>

    <ReplyPublish v-if="this.$store.state.user.loginname"
                  :topicId=topicId
                  :fetchTopic=fetchTopic></ReplyPublish>
  </div>
</template>
<script>
import 'github-markdown-css'
import '../../assets/style/markdown.css'
import { calTime, titleVal } from '../../util/util.js'
import Reply from './Reply'
import marked from '../../util/marked.js'
import { Group, XTextarea, XButton } from 'vux'
import ReplyPublish from './ReplyPublish'
export default {
  components: {
    Reply,
    Group,
    XTextarea,
    XButton,
    ReplyPublish
  },
  data () {
    return {
      topicId: this.$route.params.topicId,
      topicData: {
        author: {}
      },
      replyText: ''
    }
  },
  props: {
    changeTitle: Function
  },
  computed: {
    create_at () {
      return '发布于:' + calTime(this.topicData.create_at)
    },
    tag () {
      return titleVal[this.topicData.tab]
    },
    replyTextFormat () {
      return marked(this.replyText)
    }
  },
  methods: {
    async fetchTopic () {
      let res = await this.ajaxAxios.get('/api/topic/' + this.topicId)
      if (res.status === 200 && res['data']['success']) {
        this.topicData = res.data.data
        this.$refs.content.innerHTML = res.data.data.content
      }
    },
    async postReply () {
      const fromData = {
        accesstoken: this.$store.state.user.accessToken,
        content: this.replyText
      }
      let res = await this.$http.post(`/api//topic/${this.topicId}/replies`, { ...fromData })
      if (res.status === 200 && res['data']['success']) {
        this.$vux.toast.text('回复成功', 'bottom')
        this.fetchTopic()
      }
      this.replyText = ''
    }
  },
  created () {
    this.fetchTopic()
    this.changeTitle('主题')
  }
}
</script>

<style lang="less">
.topic {
  word-break: break-word;
}
.markdown-body {
  border-bottom: 1px solid #e0e0e0;
}
.topic-title {
  margin-bottom: 20px;
  padding: 5px;
  font-size: 18px;
  background: #f0f0f0;
  border-radius: 6px;
}
.topic-msg {
  margin-bottom: 30px;
  display: flex;
  font-size: 12px;
  line-height: 20px;
  justify-content: space-between;
  .left {
    display: flex;
    img {
      margin-right: 5px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .right {
    .tag {
      background: rgb(75, 218, 137);
      color: #fff;
      text-align: center;
      border-radius: 5px;
    }
  }
}
.reply_count {
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
  b {
    color: rgb(75, 218, 137);
  }
}
</style>

