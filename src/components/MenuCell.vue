<template>

  <router-link tag='div'
               class="menu-cell weui-cell"
               :to="link">
    <i class="iconfont"
       :class="iconClass"> {{title}}

    </i>
  </router-link>

</template>
<script>
export default {
  props: {
    iconClass: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    link: String
  }
}
</script>

<style lang="less">
.menu-cell {
  display: flex;
  align-content: center;
  a,
  a:active {
    text-decoration: none;
    color: #333;
  }
  &::before {
    right: 15px;
  }
  i {
    width: 100%;
    font-size: 16px;
    padding-right: 20px;
    line-height: 18px;
    &::before {
      font-size: 18px;
      margin-right: 25px;
    }
  }
}
</style>
