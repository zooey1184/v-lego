<template>
  <div>
    这个是我的搭建的
    <Helo msg='Helo 组件' />
    =====
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
const Helo = defineAsyncComponent(() => import('remote/HelloWrold'))

export default defineComponent({
  components: {
    Helo
  },
  setup() {
    console.log(Helo);
    return {
      
    }
  },
})
</script>
