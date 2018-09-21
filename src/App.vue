<template>
  <div id="app">
    <x-header style="width: 100%; position: fixed; left: 0px; top: 0px; z-index: 100;"
              :left-options="{showBack:false}">
      <span class="nav-icon"
            @click="drawerVisibility = !drawerVisibility">
        <x-icon type="navicon"
                size="35"
                style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      </span>
      <router-link to='/Publish'
                   tag="i"
                   slot="right"
                   class="iconfont icon-fabu"
                   style="font-size:1.5em"></router-link>
      {{title}}
    </x-header>
    <drawer width="200px;"
            :show.sync="drawerVisibility">

      <div slot="drawer">
        <group style="margin-top:20px;">
          <cell is-link
                :link="userInfo.loginname?'/user/livetune':'/login'">
            <span class="avatar-wrapper"
                  slot="title">

              <img width="40"
                   :src="userInfo.avatar_url?userInfo.avatar_url:defaultAvatar
"
                   alt="">
              <span class="loninname"
                    style="vertical-align:middle;">{{userInfo.loginname?userInfo.loginname:'登录'}}</span>
            </span>
          </cell>

        </group>
        <group style="margin-top:20px;">
          <menu-cell iconClass='icon-menu'
                     link="/"
                     title="全部"
                     @click.native="changeTitle('全部')">
          </menu-cell>
          <menu-cell iconClass='icon-like-fill'
                     link="/?tab=good"
                     title="精华"
                     @click.native="changeTitle('精华')">
          </menu-cell>
          <menu-cell iconClass='icon-share'
                     link="/?tab=share"
                     title="分享"
                     @click.native="changeTitle('分享')">
          </menu-cell>
          <menu-cell iconClass='icon-question-circle-fill'
                     link="/?tab=ask"
                     title="问答"
                     @click.native="changeTitle('问答')">
          </menu-cell>
          <menu-cell iconClass='icon-peoples'
                     link="/?tab=job"
                     title="招聘"
                     @click.native="changeTitle('招聘')">
          </menu-cell>
          <menu-cell iconClass='icon-peoples'
                     link="/?tab=dev"
                     title="测试"
                     @click.native="changeTitle('测试')">
          </menu-cell>
        </group>
        <group style="margin-top:20px;">
          <menu-cell iconClass='icon-notice'
                     link="/messages"
                     title="消息"
                     @click.native="changeTitle('消息')">
          </menu-cell>
        </group>
      </div>

      <!-- rourer-view 作为默认插槽内容 -->
      <div class="view"
           ref="view">
        <router-view :changeTitle=changeTitle></router-view>
      </div>

    </drawer>
  </div>
</template>


<script>
import { Drawer, Group, Cell, XHeader } from 'vux'
import MenuCell from './components/MenuCell'
import './assets/iconfont/iconfont.css'
import { titleVal } from './util/util.js'
import defaultAvatar from './assets/default_avatar.png'
import 'github-markdown-css'
import './assets/style/markdown.css'
export default {
  name: 'app',
  data () {
    return {
      drawerVisibility: false,
      title: '全部',
      listData: [],
      userInfo: this.$store.state.user,
      defaultAvatar
    }
  },
  components: {
    Drawer,
    Group,
    Cell,
    XHeader,
    MenuCell
  },
  mounted () {
    if (this.$route.path === '/') {
      if (this.$route.query.tab) {
        this.title = titleVal[this.$route.query.tab]
      }
    }
    // this.$store.dispatch('user/getUserInfo', '79ee634f-b930-4198-b5c4-0b0ce52c0b7a')
  },
  methods: {
    changeTitle (title) {
      this.title = title
      this.drawerVisibility = false
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/') {
        if (to.query.tab) {
          this.title = titleVal[to.query.tab]
        } else {
          this.title = '全部'
        }
      }
    }
  }

}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body,
html {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  touch-action: none;
  #app {
    height: 100%;
    .nav-icon {
      position: absolute;
      left: 16px;
      top: 13px;
    }
    .avatar-wrapper {
      img {
        vertical-align: middle;
      }
      font-size: 14px;
      .loninname {
        display: inline-block;
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .vux-drawer-content {
      background: #17c3cf;
      z-index: 101;
    }
    .view {
      position: absolute;
      left: 0;
      right: 0;
      top: 46px;
      bottom: 0;
      overflow: auto;
    }
  }
}
</style>
