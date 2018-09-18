<template>
  <div class="login">
    <div class="input">

      <x-input v-model="accessToken"
               placeholder="AccessToken"
               novalidate
               :show-clear="false"></x-input>
    </div>
    <x-button type="primary"
              @click.native="login">登录</x-button>
  </div>
</template>

<script>
import { XButton, XInput } from 'vux'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      prePath: '',
      accessToken: ''
    }
  },
  components: {
    XButton,
    XInput
  },
  props: {
    changeTitle: Function
  },
  mounted () {
    console.log(this.$router)
    this.changeTitle('登录')
    console.log('mount')
  },
  methods: {
    ...mapActions({ getUserInfo: 'user/getUserInfo' }),
    login () {
      this.getUserInfo({ accessToken: this.accessToken, prePath: this.prePath, router: this.$router })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prePath = from.name
    })
  }
}
</script>
<style lang="less">
.login {
  padding: 20px;
  .input {
    border-bottom: 1px solid rgb(47, 180, 241);
    margin: 40px 0;
  }
  button {
    background: skyblue;
  }
}
</style>
