<script setup>
import { defineProps } from "vue";

// @ts-ignore
const props = defineProps({
  line: Number,
  tip: String,
  showMore: Boolean,
});
</script>

<template>
  <div>
    <a-tooltip v-if="props.tip">
      <template #title>{{ props.tip }}</template>
      <div class="flex">
        <div
          style="width: 200px"
          class="wrap"
          :class="{ [`ellipsis-${props.line}`]: true }"
        >
          <span v-if="showMore" style="float: right; clear: both" class="pr-8"
            >确定</span
          >
          <slot></slot>
        </div>
      </div>
    </a-tooltip>

    <div class="flex" v-else>
      <div
        style="width: 200px"
        class="wrap"
        :class="{ [`ellipsis-${props.line}`]: true }"
      >
        <span v-if="showMore" style="float: right; clear: both" class="pr-8"
          >确定</span
        >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.float-r {
  float: right;
}
.float-l {
  float: left;
}
.wrap {
  &::before {
    content: "";
    float: right;
    width: 0;
    height: calc(100% - 22px);
  }
}
</style>
