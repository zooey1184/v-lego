<template>
  <div style="position: relative" ref="wrap">
    <div
      style="position: absolute; top: 0; left: 0; opacity: 0"
      ref="slotContent"
    >
      <slot></slot>
    </div>
    <a-tooltip>
      <template #title v-if="tip">
        {{ tip }}
      </template>
      <div>
        <div class="ellipsis-wrap" v-if="!useNativeClamp" ref="ellipsis">
          {{ ellipsisTxt }}
        </div>
        <div class="ellipsis-wrap" v-else ref="ellipsis">
          {{ text }}
        </div>
      </div>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, onMounted } from "vue";
import { Tooltip } from "ant-design-vue";
import clamp from "clamp-js";

interface IPros {
  text: string;
  clamp: string | number;
}

export default defineComponent({
  components: {
    "a-tooltip": Tooltip,
  },
  props: {
    clamp: {
      type: [Number, String],
      default: 1,
    },
    text: {
      type: String,
      default: "",
    },
    tip: {
      type: String,
      default: "",
    },
    // ...
    truncationChar: {
      type: String,
    },
    // 尾部HTML read more
    truncationHTML: {
      type: String,
    },
    // 是否用原生clamp  火狐不生效
    useNativeClamp: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    createElement(props: IPros) {},
  },
  setup(props) {
    const ellipsis = ref<HTMLElement | null>(null);
    const wrap = ref<HTMLElement | null>(null);
    const slotContent = ref<HTMLDivElement | null>(null);
    const ellipsisTxt = ref("");

    const setClamp = () => {
      if (props.useNativeClamp) {
        ellipsis.value &&
          clamp(ellipsis.value, {
            clamp: props.clamp,
            useNativeClamp: props.useNativeClamp,
            truncationHTML: props.truncationHTML,
            truncationChar: props.truncationChar,
          });
      } else {
        let Ele: any = document.createElement("div");
        Ele.textContent = props.text;
        Ele.setAttribute(
          "style",
          "position: absolute; left: 0; top: 0; opacity: 0; z-index: -1"
        );
        if (wrap.value) {
          if (slotContent.value && slotContent.value.childNodes.length > 2) {
            let slotDiv = undefined;
            if (slotContent.value.children?.length) {
              slotDiv = slotContent.value.children[0].cloneNode(true);
            } else {
              slotDiv = slotContent.value.cloneNode(true);
            }
            Ele = slotDiv;
            wrap.value.appendChild(Ele);
          } else {
            wrap.value.appendChild(Ele);
          }
          const clampedObj = clamp(Ele, {
            clamp: props.clamp,
            useNativeClamp: props.useNativeClamp,
            truncationHTML: props.truncationHTML,
            truncationChar: props.truncationChar,
          });
          if (clampedObj?.clamped) {
            ellipsisTxt.value = clampedObj?.clamped;
          } else {
            ellipsisTxt.value = clampedObj?.original;
          }
          wrap?.value?.removeChild(Ele);
        }
      }
    };

    watch(
      () => props.clamp,
      () => {
        setClamp();
      }
    );
    onMounted(() => {
      setClamp();
    });
    return {
      ellipsis,
      ellipsisTxt,
      wrap,
      slotContent,
    };
  },
});
</script>

<style lang="less" scoped>
.ellipsis-wrap {
  position: relative;
  transition: all 250ms linear;
  transform: translateZ(10px);
}
</style>
