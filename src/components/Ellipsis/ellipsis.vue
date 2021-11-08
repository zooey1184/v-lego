<script setup>
import {defineProps} from 'vue'

// @ts-ignore
const props = defineProps({
  line: Number,
  tip: String
})
</script>

<template>
  <div v-if='props.line === 1' class="ellipsis-1">
    <a-tooltip v-if='props.tip'>
      <template #title>{{props.tip}}</template>
      <slot></slot>
    </a-tooltip>
    <slot v-else></slot>
  </div>
  <div v-if='props.line > 1' :class="{[`ellipsis-${props.line}`]: true}">
    <slot></slot>
  </div>
</template>
