<template>
  <a-button :type='type' :danger='danger'>
    <slot></slot>
  </a-button>
</template>

<script>
import {ref, defineComponent} from 'vue'
import {Button} from 'ant-design-vue'

export default defineComponent({
  components: {
    'a-button': Button
  },
  emits: ['gclick'],
  props: {
    type: {
      type: String,
    },
    danger: {
      type: Boolean
    },
    name: {
      type: String,
      default: ''
    }
  },
})
</script>

<style src="ant-design-vue/lib/button/style/index.css"></style>