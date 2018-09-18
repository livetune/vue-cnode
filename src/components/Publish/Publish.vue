<template>
  <div class="publish">
    <group>
      <selector ref="selectTab"
                title="选择分类"
                :options="list"
                placeholder="请选择"
                v-model="defaultValue"></selector>

    </group>
    <group>
      <x-input placeholder='标题字数10以上'
               v-model="title"></x-input>
    </group>
    <box gap="10px 10px">

      <group>
        <x-textarea name='replyText'
                    placeholder="支持markdown语法"
                    :show-counter=false
                    :rows=10
                    v-model="text"></x-textarea>
      </group>
      <group>
        <x-button @click.native="postArticle"
                  type="primary">提交</x-button>
      </group>
    </box>

  </div>
</template>
<script>
import { Group, Cell, Selector, XInput, XTextarea, XButton, Box } from 'vux'

export default {
  data () {
    return {
      defaultValue: '',
      title: '',
      list: [
        { key: 'ask', value: '问答' },
        { key: 'share', value: '分享' },
        { key: 'job', value: '招聘' },
        { key: 'dev', value: '测试' }
      ],
      text: ''
    }
  },
  props: {
    changeTitle: Function
  },
  components: {
    Group,
    Cell,
    Selector,
    XInput,
    XTextarea,
    XButton,
    Box
  },
  methods: {
    async postArticle () {
      const fromData = {
        accesstoken: '79ee634f-b930-4198-b5c4-0b0ce52c0b7a',
        title: this.title,
        tab: this.defaultValue,
        content: this.text
      }
      this.$vux.loading.show({
        text: 'Loading'
      })
      try {
        let res = await this.$http.post('/api/topics', { ...fromData })
        if (res.data.success === true) {
          this.$router.push('/')
        }
      } catch (e) {
        console.log(e)
      }
      this.$vux.loading.hide()
    }
  },
  mounted () {
    this.changeTitle('发布')
  }
}
</script>
