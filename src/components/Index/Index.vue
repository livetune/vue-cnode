<template>
  <div>
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
    this.fetchListData(this.$route.query.tab)
  },
  data () {
    return {
      listData: []
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/') {
        this.fetchListData(to.query.tab)
      }
    }
  },
  methods: {
    async fetchListData (tab = '') {
      let res = await this.$http.get('/api/topics', { params: { tab: tab } })
      if (res.status === 200 && res['data']['success']) {
        this.listData = res.data.data
      }
    }
  }
}
</script>
