<template>
  <div ref="index"
       class="index">
    <div v-for="(val,key) in listData"
         :key=key>
      <router-link tag='div'
                   :to="{name:'Topic',params:{topicId:val.id}}">
        <list :itemData=val></list>
      </router-link>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
// import { XHeader } from 'vux'
import List from './List'
export default {
  components: {
    List
  },
  mounted () {
    this.tab = this.$route.query.tab
    this.fetchListData()
    this.$refs.index.onscroll = (v) => {
      if (this.isFetch) {
        return
      }
      const indexElm = v.target
      if (indexElm.scrollHeight - indexElm.scrollTop - indexElm.clientHeight < 140) {
        this.fetchListData()
      }
    }
  },
  data () {
    return {
      listData: [],
      page: 0,
      tab: '',
      isFetch: false
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/') {
        this.$refs.index.scrollTop = 0
        this.page = 0
        this.tab = to.query.tab
        this.fetchListData()
      }
    }
  },
  methods: {
    async fetchListData () {
      this.isFetch = true

      let res = await this.ajaxAxios.get('/api/topics', { params: { tab: this.tab, page: this.page } })
      if (res.status === 200 && res['data']['success']) {
        this.listData = this.page === 0 ? res.data.data : [...this.listData, ...res.data.data]
        console.log(this.listData)
        this.page++
      }
      this.isFetch = false
    }
  }
}
</script>
<style lang="less">
.index {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
