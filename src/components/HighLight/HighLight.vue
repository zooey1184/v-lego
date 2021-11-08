<template>
  <span v-if="keywordIndex > -1">
    {{ text.substr(0, keywordIndex)
    }}<span :style="{ color: color, ...highlightStyle }">{{ keyword }}</span
    >{{ text.substr(keywordIndex + keyword.length) }}
  </span>
  <span v-else>{{ text }}</span>
</template>

<script>
export default {
  props: {
    text: String,
    keyword: String,
    color: {
      type: String,
      default: "#f50",
    },
    highlightStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    keywordIndex() {
      return this.text?.indexOf(this.keyword ?? "");
    },
  },
};
</script>
