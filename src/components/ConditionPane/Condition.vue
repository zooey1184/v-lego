<template>
  <a-row :gutter='gutter' class="border-box" v-bind='$props'>
    <slot></slot>
  </a-row>
</template>

<script>
import {Row, Col} from 'ant-design-vue'

export default {
  name: 'ConditionWrap',
  components: {
    'a-row': Row,
    'a-col': Col
  },
  props: {
    gutter: {
      type: Number,
      default: 20
    },
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