<template>
  <div class="pos-r">
    <a-tooltip>
      <template v-if="tip" #title>{{ tip }}</template>
      <div class="flex">
        <div
          ref="ellipsisPane"
          :style="{
            height: ellipsis
              ? beforeH
                ? `${beforeH}px`
                : undefined
              : expandHeight,
          }"
          :class="{ [`ellipsis-${line}`]: ellipsis, wrap: true }"
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

<script>
import { defineComponent, ref, onMounted, computed, nextTick } from "vue";
import { Tooltip } from "ant-design-vue";

export default defineComponent({
  components: {
    "a-tooltip": Tooltip,
  },
  props: {
    line: {
      type: Number,
      default: 1,
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
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const handleChange = () => {
      ellipsis.value = !ellipsis.value;
      emit("update:value", ellipsis.value);
    };

    const ellipsis = ref(props.value);
    const ellipsisPane = ref(null);
    const ellipsisExtra = ref(null);
    const beforeH = ref(0);
    const afterH = ref(0);
    onMounted(async () => {
      if (!beforeH.value) {
        await nextTick();
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
    const expandHeight = computed(() => {
      return props.expandHeight
        ? props.expandHeight
        : afterH?.value
        ? `${afterH.value}px`
        : undefined;
    });

    return {
      handleChange,
      expandHeight,
      ellipsis,
      ellipsisPane,
      ellipsisExtra,
      beforeH,
      afterH,
    };
  },
});
</script>

<style lang="less" scoped>
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
.ellipsis-multi(@line: 1; @width: 100%) when (@line >= 1) {
  .ellipsis-@{line} {
    width: @width;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: @line; /** 显示的行数 **/
    overflow: hidden; /** 隐藏超出的内容 **/
  }
  @media screen and (min--moz-device-pixel-ratio: 0) {
    .ellipsis-@{line} {
      position: relative;
      overflow: hidden;
      display: block;
      &:after {
        content: "...";
        position: absolute;
        bottom: 0;
        right: 10px;
        padding-left: 40px;
      }
    }
  }
  .ellipsis-multi(@line - 1, @width: 100%);
}
.ellipsis-multi(12);
// .ellipsis-1 {
//   width: 100%;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   overflow: hidden;
// }
.float-r {
  float: right;
}
.float-l {
  float: left;
}
.clear-both {
  clear: both;
}
</style>
