<template>
  <div>
    this is Helo page
    {{val}}
    <input placeholder="请输入" v-model="val" />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const data = reactive({
      val: "",
    });
    return { ...toRefs(data) };
  },
});
</script>
