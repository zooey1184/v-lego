<template>
  <div v-if='showSearch'>
    <a-input-search
      :style="searchStyle"
      :class="searchClass"
      :placeholder="placeholder"
      v-model:value="search_Value"
    />
  </div>
  <div class="g-tree-wrap" :style="contentStyle" :class="contentClass">
    <a-tree
      :checkable="checkable"
      :tree-data="getTreeData"
      v-bind="$attrs"
      v-model:expandedKeys="expanded_Keys"
      v-model:selectedKeys="selected_Keys"
      v-model:checkedKeys="checked_Keys"
      autoExpandParent
      :showLine="showLine"
      :auto-expand-parent="autoExpandParent"
      @select='handleSelectItem'
    >
      <template #title="item">
        <div
          class="flex items-center pos-r tree-itemWrap"
          :class="itemClass(item)"
          :style="itemStyle(item)"
        >
          <slot name="prefix" v-bind="item"></slot>
          <HighlightSearch :text="item.title" :keyword="search_Value" />
          <slot name="more" v-bind="item"></slot>
        </div>
      </template>
    </a-tree>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Input, Tree } from "ant-design-vue";
import HighlightSearch from "../HighLight";
import { log } from "console";

interface ICheckMatch {
  attr: string[];
  value: string | string[];
}

export default defineComponent({
  components: {
    "a-input-search": Input.Search,
    "a-tree": Tree,
    HighlightSearch,
  },
  props: {
    treeData: {
      type: Array,
      default: () => [],
    },
    searchFilter: Boolean,
    showSearch: {
      type: Boolean,
      default: true
    },
    showLine: Boolean,
    placeholder: String,
    searchAttr: {
      type: Array,
      default: () => ["title"],
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    searchClass: {
      type: [Array, Object, String],
      default: "",
    },
    searchStyle: {
      type: Object,
      default: () => ({}),
    },
    contentStyle: {
      type: Object,
      default: () => ({}),
    },
    contentClass: {
      type: [String, Array, Object],
      default: "",
    },
    itemClass: {
      type: Function,
      default: () => {},
    },
    itemStyle: {
      type: Function,
      default: () => {},
    },
    selectedKeys: {
      type: Array,
      default: () => [],
    },
    expandedKeys: {
      type: Array,
      default: () => [],
    },
    checkedKeys: {
      type: Array,
      default: () => [],
    },
    searchValue: {
      type: String,
      default: "",
    },
  },
  watch: {
    searchValue(n) {
      this.search_Value = n
    }
  },
  emits: [
    "update:selectedKeys",
    "update:checkedKeys",
    "update:expandedKeys",
    "update:searchValue",
    "onSelect"
  ],
  computed: {
    getTreeData() {
      if (this.searchFilter && this.search_Value) {
        const keys = this.getExpandKeysFn(this.treeData, {
          attr: ["title"],
          value: this.search_Value,
        });
        this.expanded_Keys = keys;
        const list = this.getTreeDataByKeys(this.treeData, keys);
        return list?.length ? list : this.treeData;
      }
      return this.treeData;
    },
  },
  methods: {
    // 匹配选项是否符合该项属性的值
    checkAttrMatch(item: any, options: ICheckMatch) {
      const { attr, value } = options;
      if (typeof value === "string") {
        // 模糊匹配
        return attr.some((ii) => item?.[ii]?.indexOf(value) > -1);
      } else if (typeof value === "object") {
        // 精准匹配
        return attr.find((ii) => value.includes(item?.[ii]));
      }
      return false;
    },
    // 递归获取符合项的key
    getExpandKeysFn(
      data: any,
      options: { attr: string[]; value: string[] | string },
      _t: string[] = []
    ) {
      const { attr, value } = options;
      const _keys = _t;
      data.forEach((item: any) => {
        if (item?.children?.length) {
          const child_key = this.getExpandKeysFn(
            item.children,
            { attr, value },
            _keys
          );
          if (child_key?.length) {
            _keys.push(item.key);
            _keys.concat(child_key);
          }
        }
        if (this.checkAttrMatch(item, { value, attr })) {
          _keys.push(item.key);
        }
      });
      return _keys;
    },
    // 通过key 来反向过滤treeData
    getTreeDataByKeys(data: any[], keys: string | any[]) {
      let t: string[] = [];
      data.forEach((item) => {
        if (item?.key) {
          if (keys.includes(item.key)) {
            if (item?.children?.length) {
              const _childItem = this.getTreeDataByKeys(item.children, keys);
              if (_childItem?.length) {
                t.push({
                  ...item,
                  children: _childItem,
                });
              }
            } else {
              t.push(item);
            }
          } else if (item?.children?.length) {
            const _t = this.getTreeDataByKeys(item.children, keys);
            if (_t?.length) {
              t.push({
                ...item,
                children: _t,
              });
            }
          }
        }
      });
      return t;
    },
  },
  setup(props, { emit }) {
    const expanded_Keys = ref(props.expandedKeys);
    const selected_Keys = ref(props.selectedKeys);
    const checked_Keys = ref(props.checkedKeys);
    const search_Value = ref(props.searchValue);
    
    const autoExpandParent = ref(false)

    watch(expanded_Keys, () => {
      emit("update:expandedKeys", expanded_Keys.value);
    });
    watch(selected_Keys, () => {
      emit("update:selectedKeys", selected_Keys.value);
    });
    watch(checked_Keys, () => {
      emit("update:checkedKeys", checked_Keys.value);
    });
    watch(search_Value, () => {
      emit("update:searchValue", search_Value.value);
    });

    // onExpand(expandedKeys) {
    //   this.expandedKeys = expandedKeys;
    //   this.autoExpandParent = false;
    // }

    const handleSelectItem = (e: any, node: any) => {
      emit("onSelect", e, node)
    }

    return {
      expanded_Keys,
      selected_Keys,
      checked_Keys,
      search_Value,
      autoExpandParent,
      handleSelectItem
    };
  },
});
</script>

<style lang="less" scoped>
.g-tree-wrap {
  :deep {
    .ant-tree li span.ant-tree-switcher,
    .ant-tree li span.ant-tree-iconEle {
      padding-top: 7px;
    }
    .ant-tabs-nav .ant-tabs-tab {
      height: auto !important;
    }
  }
}
</style>
