<template>
  <div>
    <tab :line-width="1"
         custom-bar-width="60px">
      <tab-item selected
                @click.native="changeList('noread')">未读消息</tab-item>
      <tab-item @click.native="changeList('read')">已读消息</tab-item>
    </tab>
    <div class="messageList"
         v-for="(val) in list"
         :key=val.id>
      <MessagesList :val=val
                    :calTime=calTime></MessagesList>

    </div>

  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
import { calTime } from '../../util/util.js'
import MessagesList from './MessagesList'
export default {
  components: {
    Tab,
    TabItem,
    MessagesList
  },
  data () {
    return {
      hasReadMessages: [],
      hasnotReadMessages: [],
      calTime,
      list: []
    }
  },
  props: {
    changeTitle: Function

  },
  created () {
    this.changeTitle('用户信息')
    this.fetchUser()
  },
  methods: {
    async fetchUser () {
      let res = await this.ajaxAxios.get(`/api/messages`, { params: { accesstoken: this.$store.state.user.accessToken } })
      if (res.status === 200 && res.data.success === true) {
        this.hasReadMessages = res.data.data.has_read_messages
        this.hasnotReadMessages = res.data.data.hasnot_read_messages
        this.list = this.hasnotReadMessages
      }
    },
    changeList (type) {
      if (type === 'read') {
        this.list = this.hasReadMessages
      } else if (type === 'noread') {
        this.list = this.hasnotReadMessages
      }
    }
  }
}
</script>

<style lang="less">
.head {
  background: #4adbff;
  text-align: center;
  color: #fff;
  padding-bottom: 10px;
  img {
    width: 33%;
    border-radius: 50%;
    margin-top: 10px;
  }
  .score-create {
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
  }
}
</style>
