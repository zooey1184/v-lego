<script setup>
import { defineProps, ref, defineEmits, onMounted, computed } from "vue";
// @ts-ignore
const props = defineProps({
  line: Number,
  tip: String,
  showMore: Boolean,
  text: String,
  value: {
    type: Boolean,
    default: true
  },
  more: {
    type: String,
    default: "更多",
  },
  ellipsisHeight: [String, Number],
  expandHeight: [String, Number]
});

const emit = defineEmits(['update:value'])
const ellipsis = ref(props.value)
const handleChange = () => {
  ellipsis.value = !ellipsis.value
  emit('update:value', ellipsis.value)
}

const ellipsisPane = ref(null)
const ellipsisExtra = ref(null)
const beforeH = ref(0)
const afterH = ref(0)
onMounted(() => {
  if (!beforeH.value) {
    // @ts-ignore
    const rect = ellipsisPane?.value?.getBoundingClientRect()
    if (rect?.height) {
      // @ts-ignore
      beforeH.value = rect.height
    }
  }

  if (!afterH.value) {
    // @ts-ignore
    const arect = ellipsisExtra?.value?.getBoundingClientRect()
    if (arect?.height) {
      afterH.value = arect.height
    }
  }
})


defineExpose({
  handleChange
})
</script>

<template>
  <div class="pos-r">
    <a-tooltip>
      <template v-if="tip" #title>{{ tip }}</template>
      <div class="flex">
        <div class="wrap" ref='ellipsisPane' :style="{height: ellipsis ?( beforeH ? `${beforeH}px` : undefined) : (afterH ? `${afterH}px` : undefined)}" :class="{ [`ellipsis-${line}`]: ellipsis }">
          <span v-if="showMore" class="float-r pr-8 clear-both" @click='handleChange'>
            <slot name="more">{{ more }}</slot>
          </span>
          <slot name='text'>{{text}}</slot>
        </div>
      </div>
    </a-tooltip>
    <div v-if='text && !afterH' ref='ellipsisExtra' class="pos-a" style="visibility: hidden;">
      {{text}}
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
