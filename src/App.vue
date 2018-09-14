<template>
  <div id="app">
    <x-header style="width: 100%; position: fixed; left: 0px; top: 0px; z-index: 100;"
              :left-options="{showBack:false}"
              :right-options="{showMore: true}">
      <span class="nav-icon"
            @click="drawerVisibility = !drawerVisibility">
        <x-icon type="navicon"
                size="35"
                style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
      </span>
      {{title}}
    </x-header>
    <drawer width="200px;"
            :show.sync="drawerVisibility">

      <div slot="drawer">
        <group style="margin-top:20px;">
          <menu-cell iconClass='icon-menu'
                     link="/about"
                     title="全部">sadsad</menu-cell>

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

        </group>
      </div>

      <!-- rourer-view 作为默认插槽内容 -->
      <div class="view">
        <router-view></router-view>
      </div>

    </drawer>
  </div>
</template>


<script>
import { Drawer, Group, Cell, XHeader } from 'vux'
import MenuCell from './components/MenuCell'
import './assets/iconfont/iconfont.css'
import { titleVal } from './util/filter.js'

export default {
  name: 'app',
  data () {
    return {
      drawerVisibility: false,
      title: '全部',
      listData: []
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
  #app {
    height: 100%;
    .nav-icon {
      position: absolute;
      left: 16px;
      top: 13px;
    }

    .vux-drawer-content {
      background: #17c3cf;
      z-index: 101;
    }
    .view {
      position: absolute;
      left: 0;
      right: 0;
      top: 50px;
      bottom: 0;
      overflow: auto;
    }
  }
}
</style>
