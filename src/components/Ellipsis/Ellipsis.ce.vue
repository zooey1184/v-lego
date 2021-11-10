<script setup>
import { defineProps, ref, defineEmits, onMounted, computed } from "vue";
// @ts-ignore
const props = defineProps({
  line: {
    type: Number,
    default: 1
  },
  tip: String,
  expandble: Boolean,
  text: String,
  value: {
    type: Boolean,
    default: true,
  },
  // 展开后的文字
  expandText: {
    type: String,
    default: "收起",
  },
  // 未展开的文字
  unexpandText: {
    type: String,
    default: "更多",
  },
  expandHeight: [String, Number],
});

const ellipsis = ref(props.value);
const ellipsisPane = ref(null);
const ellipsisExtra = ref(null);
const beforeH = ref(0);
const afterH = ref(0);

const emit = defineEmits(["update:value"]);

const handleChange = () => {
  ellipsis.value = !ellipsis.value;
  emit("update:value", ellipsis.value);
};

// 获取展开后的高度
const _expandHeight = computed(() => {
  return props.expandHeight
    ? props.expandHeight
    : afterH?.value
    ? `${afterH.value}px`
    : undefined;
});
onMounted(() => {
  if (!beforeH.value) {
    // @ts-ignore
    const rect = ellipsisPane?.value?.getBoundingClientRect();
    if (rect?.height) {
      // @ts-ignore
      beforeH.value = rect.height;
    }
  }
  if (!afterH.value) {
    // @ts-ignore
    const arect = ellipsisExtra?.value?.getBoundingClientRect();
    if (arect?.height) {
      afterH.value = arect.height;
    }
  }
});
</script>

<template>
  <div class="pos-r">
    <a-tooltip>
      <template v-if="tip" #title>{{ tip }}</template>
      <div class="flex">
        <div
          class="wrap"
          ref="ellipsisPane"
          :style="{
            height: ellipsis
              ? beforeH
                ? `${beforeH}px`
                : undefined
              : _expandHeight,
          }"
          :class="{ [`ellipsis-${line}`]: ellipsis }"
        >
          <span
            v-if="expandble"
            class="float-r pr-8 clear-both"
            @click="handleChange"
          >
            <slot name="more">{{ ellipsis ? unexpandText : expandText }}</slot>
          </span>
          <slot name="text">{{ text }}</slot>
        </div>
      </div>
    </a-tooltip>
    <div
      v-if="text && !afterH && !expandHeight"
      ref="ellipsisExtra"
      class="pos-a"
      style="visibility: hidden"
    >
      {{ text }}
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
.clear-both {
  clear: both;
}
.wrap {
  transition: all 250ms linear;
  transform: translateZ(10px);
  &::before {
    content: "";
    float: right;
    width: 0;
    height: calc(100% - 22px);
  }
}
</style>
