<template>
  <section class="list-item">
    <h4>
      <span class="list-tag"
            :class={tagClass:itemData.top||itemData.good}>{{tag}}</span>{{itemData.title}}</h4>
    <div class="list-item-wrapper">
      <div class="list-item-left">
        <img :src="itemData.author.avatar_url"
             alt="">
      </div>
      <div class="list-item-right">
        <div class="list-msg">
          <div class="list-msg-left">
            <div>{{itemData.author.loginname}}</div>
            <div>{{createTime}}</div>
          </div>
          <div class="list-msg-right">
            <div>
              <b>{{itemData.reply_count}}</b>/{{itemData.visit_count}}</div>
            <div>{{lastTime}}</div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
<script>
import { filterTag, titleVal, calTime } from '../../util/util.js'
export default {
  props: {
    itemData: Object
  },
  computed: {
    tag () {
      return this.itemData ? filterTag(this.itemData, titleVal) : ''
    },
    createTime () {
      return calTime(this.itemData.create_at)
    },
    lastTime () {
      return calTime(this.itemData.last_reply_at)
    }

  }
}
</script>

<style lang="less">
.list-item {
  padding: 10px 15px;
  border-bottom: 1px solid #e0e0e0;
  h4 {
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
      display: inline-block;
      width: 40px;
      margin-right: 20px;
      text-align: center;
      line-height: 1.85;
      background: #e5e5e5;
      color: #999;
      border-radius: 3px;
      font-size: 12px;
      font-weight: normal;
      &.tagClass {
        background: rgb(3, 226, 140);
        color: #fff;
      }
    }
  }
  .list-item-wrapper {
    display: flex;
    .list-item-left {
      flex: 0 0 40px;
      margin-right: 20px;
      width: 40px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .list-item-right {
      flex: 1;
      b {
        color: rgb(135, 235, 165);
      }
    }
    .list-msg {
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      .list-msg-right {
        text-align: right;
      }
    }
  }
}
</style>
