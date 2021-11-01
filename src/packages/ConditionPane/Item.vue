<template>
  <div v-if='type === "end"' style="float: right; margin: 4px 0">
    <slot></slot>
  </div>
  <a-col v-else v-bind="getProps" style="margin: 4px 0">
    <div class="flex items-center">
      <slot name='label'>
        <span class="flex-0" v-if="label" :style="labelStyleObj">
        {{label}}
        <span v-if="colon">：</span>
      </span>
      </slot>
      <slot></slot>
    </div>
  </a-col>
</template>

<script>
import {Col} from 'ant-design-vue'

export default {
  components: {
    'a-col': Col
  },
  data() {
    return {
      d_xxl: '',
      d_xl: '',
      d_lg: '',
      d_md: '',
      d_span: ''
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    colon: {
      type: Boolean,
      default: true
    },
    md: {
      type: Number,
    },
    lg: {
      type: Number,
    },
    xl: {
      type: Number,
    },
    xxl: {
      type: Number,
    },
    type: {
      type: String,
      default: ''
    },
    labelStyle: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // @ts-ignore
    getProps() {
      return {
        // @ts-ignore
        ...this.$props,
        // @ts-ignore
        xl: this.d_xl,
        // @ts-ignore
        xxl: this.d_xxl,
        // @ts-ignore
        lg: this.d_lg,
        // @ts-ignore
        md: this.d_md,
        // @ts-ignore
        span: this.d_span,
      }
    },
    // @ts-ignore
    labelStyleObj() {
      // @ts-ignore
      const attr = this.$parent.$attrs
      if (attr) {
        // @ts-ignore
        const labelWidth = attr.labelWidth ? (typeof attr.labelWidth === 'number' ? {width: `${attr.labelWidth}px`} : {width: attr.labelWidth}) : {}
        const labelAlign = attr.labelAlign ? {textAlign: attr.labelAlign} : {}
        // @ts-ignore
        return Object.assign({}, labelWidth, labelAlign, this.labelStyle)
      }
      // @ts-ignore
      return this.labelStyle
    }
  },
  mounted() {
    // @ts-ignore
    const attr = this.$parent.$attrs
    if (attr) {
      const {xxl, xl, lg, md, span} = attr
      // @ts-ignore
      this.d_xxl = this.xxl || xxl || xl || lg || md || span
      // @ts-ignore
      this.d_xl = this.xl || xl || lg || md || span || xxl
      // @ts-ignore
      this.d_lg = this.lg || lg || md || span || xl || xxl
      // @ts-ignore
      this.d_md = this.md || md || span || lg || xl || xxl
    }
  }
}
</script>
