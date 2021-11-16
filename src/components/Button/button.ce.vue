<template>
  <a-button v-bind='$props'>
    <slot></slot>
  </a-button>
</template>

<script>
import {ref, defineComponent} from 'vue'
import {Button} from 'ant-design-vue'
import buttonProps from 'ant-design-vue/lib/button/buttonTypes'

export default defineComponent({
  components: {
    'a-button': Button
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    ...buttonProps
  },
})
</script>

<style src="ant-design-vue/lib/button/style/index.css"></style>