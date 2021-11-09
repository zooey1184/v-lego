<template>
  <div>
    <div class="border-box w-100p p-16">
      <div style="font-size: 18px; font-weight: 600">搜索面板</div>
      <Condition>
        <c-item label="名称1">
          <a-input />
        </c-item>
        <c-item label="名称2">
          <a-input />
        </c-item>
        <c-item label="名称">
          <a-input />
        </c-item>
        <c-item label="名称">
          <a-input />
        </c-item>
        <c-item type="end">
          <a-button type="primary">确定</a-button>
        </c-item>
      </Condition>
    </div>

    <div class="p-16">
      <div style="font-size: 18px; font-weight: 600">高亮HighLight</div>
      <a-input v-model:value="keyword" placeholder="请输入高亮文案" />
      <high-light text="这个是搜索文案" :keyword="keyword"></high-light>
    </div>
    <div class="p-16">
      <div>
        <div style="font-size: 18px; font-weight: 600">树Tree</div>
        <div>
          <Tree
            searchFilter
            :treeData="treeData"
            v-model:searchValue="keyword"
            v-model:selectedKeys="selected_Keys"
            @onSelect="handleSelect"
          ></Tree>
        </div>
      </div>
    </div>

    <div class="p-16">
      <div style="font-size: 18px; font-weight: 600">省略ellipsis</div>
      <div style="width: 300px; display: inline-block">
        <Ellipsis v-model='ellipsisVal' :line='2' showMore text='这里发现了一个很有意思的事情当文字是中文时上面的代码是可以实现环绕效果的，结果如这里发现了一个很有意思的事情，当文字是中文时，上面的代码是可以实现环绕效果的，结果如这里发现了一个很有意思的事情，当文字是中文时，上面的代码是可以实现环绕效果的'>
          
          <!-- <template #text>
            这里发现了一个很有意思的事情当文字是中文时上面的代码是可以实现环绕效果的，实现环绕效果发现了一个很有意思的事情，当文字是中文时，上面的代码是可以实现环绕效果的，结果如这里发现了一个很有意思的事情，当文字是中文时，上面的代码是可以实现环绕效果的
          </template> -->
        </Ellipsis>
      </div>
    </div>

    <div>
      helo world
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Condition from "@/components/ConditionPane";
import Tree from "@/components/TreePane";
import HighLight from "@/components/HighLight";
import Ellipsis from '@/components/Ellipsis'

export default defineComponent({
  components: {
    Condition,
    "c-item": Condition.Item,
    Tree,
    HighLight,
    Ellipsis
  },
  setup() {
    const value = ref<string>("");
    const visible = ref(false);
    const handleOk = () => {
      
      visible.value = true;
    };

    const keyword = ref("");
    const treeData = ref([
      {
        title: "parent 1",
        key: "0-0",
        children: [
          {
            title: "张晨成",
            key: "0-0-0",
            disabled: true,
            children: [
              { title: "leaf", key: "0-0-0-0", disableCheckbox: true },
              { title: "leaf", key: "0-0-0-1" },
            ],
          },
          {
            title: "parent 1-1",
            key: "0-0-1",
            children: [{ key: "0-0-1-0", title: "zcvc" }],
          },
        ],
      },
    ]);

    const selected_Keys = ref(["0-0-1-0"]);
    watch(selected_Keys, (n) => {
      console.log(`n`, n);
    });

    const handleSelect = (e: any, node: any) => {
      console.log('handleSelect', e, node)
    }

    const ellipsisVal = ref(true)
    return {
      value,
      visible,
      handleOk,
      treeData,
      keyword,
      selected_Keys,
      handleSelect,
      ellipsisVal
    };
  },
});
</script>

<style lang="less" scoped>
.wrap {
  width: 200px;
&::before {
    content: "";
    float: right;
    width: 0;
    height: calc(100% - 20px);
  }
}
.a {
  float: right;
  clear: both;
  background: rosybrown;
}
</style>