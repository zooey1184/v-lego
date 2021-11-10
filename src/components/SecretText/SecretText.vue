<template>
  {{secret}}
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  symbol: {
    type: String,
    default: '*'
  },
  len: Number,
  start: {
    type: Number,
    default: 0
  },
  match: {
    type: RegExp,
  }
})

const secret = computed(() => {
  const text = props.text
  const start = props.start

  const _len = text?.length > 3 ? (text.length - 2) : 1
  const len = props.len ?? _len
  const symbol = props.symbol
  
  if (props.match) {
    return text?.replace(props.match, symbol)
  } else {
    return text?.substr(0, start) + symbol?.repeat(len) + text?.substr(start + len)
  }
})
</script>