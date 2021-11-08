<template>
  <div v-if="type === 'end'" :style="{margin: `4px 0`, paddingRight: `${$parent.$props.gutter/2}px`}" class="flex flex-1 justify-end">
    <slot></slot>
  </div>
  <a-col v-else v-bind="getProps" style="margin: 4px 0">
    <div class="flex items-center">
      <slot name="label">
        <span class="flex-0" v-if="label" :style="labelStyleObj">
          {{ label }}
          <span v-if="colon">：</span>
        </span>
      </slot>
      <slot></slot>
    </div>
  </a-col>
</template>

<script>
import { Col } from "ant-design-vue";

export default {
  name: "ConditionItem",
  components: {
    "a-col": Col,
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    colon: {
      type: Boolean,
      default: true,
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
    span: {
      type: Number,
    },
    type: {
      type: String,
      default: "",
    },
    labelStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getGutter() {
      // @ts-ignore
      const attr = this.$parent.$attrs;
      const {gutter} = attr
      return gutter
    },
    getProps() {
      // @ts-ignore
      const attr = this.$parent.$attrs;
      const { xxl, xl, lg, md, span } = attr;
      
      let d_xxl = this.xxl || xxl || xl || lg || md || span;
      let d_xl = this.xl || xl || lg || md || span || xxl;
      let d_lg = this.lg || lg || md || span || xl || xxl;
      let d_md = this.md || md || span || lg || xl || xxl;
      let d_span = this.span || span;
      console.log(d_span);
      return {
        ...this.$props,
        xl: this.span ?? d_xl,
        xxl: this.span ?? d_xxl,
        lg: this.span ?? d_lg,
        md: this.span ?? d_md,
        span:  d_span,
      };
    },
    labelStyleObj() {
      // @ts-ignore
      const attr = this.$parent.$attrs;
      if (attr) {
        const labelWidth = attr.labelWidth
          ? typeof attr.labelWidth === "number"
            ? { width: `${attr.labelWidth}px` }
            : { width: attr.labelWidth }
          : {};
        const labelAlign = attr.labelAlign
          ? { textAlign: attr.labelAlign }
          : {};
        return Object.assign({}, labelWidth, labelAlign, this.labelStyle);
      }
      return this.labelStyle;
    },
  },
};
</script>
