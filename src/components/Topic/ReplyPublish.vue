<template>
  <div class="reply_text">
    <group>
      <x-textarea name='replyText'
                  placeholder="支持markdown语法"
                  :show-counter=false
                  v-model="replyText"></x-textarea>
    </group>
    <group>
      <x-button type="primary"
                @click.native="postReply">回复</x-button>
    </group>
  </div>
</template>

<script>
import { XTextarea, Group, XButton } from 'vux'
export default {
  data () {
    return {
      replyText: this.replyName ? `@${this.replyName} ` : ''
    }
  },
  components: {
    XTextarea,
    Group,
    XButton
  },
  props: {
    topicId: String,
    fetchTopic: Function,
    replyId: String,
    replyName: String
  },
  methods: {
    async postReply () {
      const fromData = {
        accesstoken: this.$store.state.user.accessToken,
        content: this.replyText
      }
      if (this.replyId) {
        fromData.reply_id = this.replyId
      }
      let res = await this.$http.post(`/api//topic/${this.topicId}/replies`, { ...fromData })
      if (res.status === 200 && res['data']['success']) {
        this.$vux.toast.text('回复成功', 'bottom')
        this.fetchTopic()
      } else {
        this.$vux.toast.text('回复失败', 'bottom')
      }
      this.replyText = this.replyName ? `@${this.replyName} ` : ''
      this.$emit('replyEnd')
    }
  }
}
</script>
