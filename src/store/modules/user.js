import Vue from 'vue'
const initState = window.localStorage.getItem('userInfo')
const state = initState
  ? JSON.parse(initState)
  : {
    accessToken: '',
    loginname: '',
    id: '',
    avatarUrl: ''
  }

const actions = {
  async getUserInfo ({ commit, state }, { accessToken, prePath, router }) {
    let res
    try {
      res = await Vue.http.post('/api/accesstoken', {
        accesstoken: accessToken
      })
      if (res.status === 200) {
        window.localStorage.setItem(
          'userInfo',
          JSON.stringify({ ...res.data, accessToken })
        )
        commit('setUserinfo', { ...res.data, accessToken })
        if (prePath) {
          router.push({ name: prePath })
        }
      } else {
        Vue.$vux.toast.text('登录失败', 'bottom')
      }
    } catch (e) {
      console.log(e)
      Vue.$vux.toast.text('登录失败', 'bottom')
    }
  }
}

const mutations = {
  setUserinfo (state, { loginname, accessToken, avatar_url, id }) {
    state.accessToken = accessToken
    state.loginname = loginname
    /*eslint-disable*/
    state.avatarUrl = avatar_url
    state.id = id
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
