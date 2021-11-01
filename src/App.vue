<template>
  <div>
    ddd {{ value }}
    <a-button @click="handleOk" type='primary'>helo</a-button>
    <a-input placeholder="Basic usage" v-model:value='value' />
    <a-tag>Tag 1</a-tag>
    <a-timeline>
      <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
      <a-timeline-item
        >Solve initial network problems 2015-09-01</a-timeline-item
      >
      <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
      <a-timeline-item
        >Network problems being solved 2015-09-01</a-timeline-item
      >
    </a-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Tag, Timeline, Input, Button } from "ant-design-vue";
export default defineComponent({
  components: {
    "a-tag": Tag,
    "a-timeline": Timeline,
    "a-timeline-item": Timeline.Item,
    'a-input': Input,
    'a-button': Button
  },
  setup() {
    // console.log(Input)
    const value = ref<string>("");
    const visible = ref(false);
    const handleOk = () => {
      console.log('helo world');
      
      visible.value = true;
    };

    return {
      value,
      visible,
      handleOk,
    };
  },
});
</script>
