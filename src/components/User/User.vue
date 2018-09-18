<template>
  <div>
    <div class="head">
      <img :src="userInfo.avatar_url"
           alt=""
           class="avatar">
      <p>{{userInfo.loginname}}</p>
      <p class="score-create">
        <span class="create">注册于{{calTime(userInfo.create_at)}}</span>
        <span class="score">积分: {{userInfo.score}}</span>
      </p>
    </div>
    <tab :line-width="1"
         custom-bar-width="60px">
      <tab-item selected
                @click.native="changeList('reply')">最近回复</tab-item>
      <tab-item @click.native="changeList('topic')">最新发布</tab-item>
    </tab>
    <div class="topicList"
         v-for="(val) in list"
         :key=val.id>
      <TopicList :val=val
                 :calTime=calTime
                 @click.native="$router.push('/topic/'+val.id)"></TopicList>

    </div>

  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
import { calTime } from '../../util/util.js'
import TopicList from './TopicList'
export default {
  components: {
    Tab,
    TabItem,
    TopicList
  },
  data () {
    return {
      loginname: this.$route.params.loginname,
      userInfo: {},
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
      let res = await this.ajaxAxios.get(`/api/user/${this.loginname}`)
      if (res.status === 200 && res.data.success === true) {
        this.userInfo = res.data.data
        this.list = this.userInfo.recent_replies
      }
    },
    changeList (type) {
      if (type === 'reply') {
        this.list = this.userInfo.recent_replies
      } else if (type === 'topic') {
        this.list = this.userInfo.recent_topics
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
