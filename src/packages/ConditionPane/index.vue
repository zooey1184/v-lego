<template>
  <div>
    <a-button>
      <slot></slot>
    </a-button>
  </div>
</template>

<script>
import {Button} from 'ant-design-vue'
import {defineAsyncComponent} from 'vue'
// const {Row} = defineAsyncComponent(() => import('ant-design-vue'))

export default {
  components: {
    'a-button': Button,
  },
  props: {
    md: {
      type: Number,
      default: 12
    },
    lg: {
      type: Number,
      default: 8
    },
    xl: {
      type: Number,
      default: 8
    },
    xxl: {
      type: Number,
      default: 6
    },
    labelWidth: [Number, String],
    labelAlign: String
  }
}
</script>