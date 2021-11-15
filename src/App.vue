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
      <!-- <div style="width: 300px; display: inline-block">
        <Ellipsis v-model='ellipsisVal' :line='1' text='这个是神这个是什么这个是神这个是什么这个是神这个是什么这个是神这个是什么个是什么这个是神这个是什么是神这个是什么这个是神这个是什么' expandText="zhankai" unexpandText="weizhankai" expandble tip='hhhh' expandHeight='200px'>
          
        </Ellipsis>
      </div> -->

      <div style="width: 200px">
        <a-button @click='handleExpand'>expand toggle</a-button>
        <EllipsisPane :useNativeClamp="true" :clamp='line' text='这个是神这个是什么这个是神这个是什么这个是神这个是什么这个是神这个是什么个是什么这个是神这个是什么是神这个是什么这个是神这个是什么'>
          
        </EllipsisPane>
      </div>
    </div>

    <div class="p-16">
      <div style="font-size: 18px; font-weight: 600">脱敏组件SecretText</div>
      <div>
        <SecretText text='12333331212' :start='3'></SecretText>
      </div>
    </div>

    <div>
      <gButton @gclick="handleTest">hhhh</gButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Condition from "@/components/ConditionPane";
import Tree from "@/components/TreePane";
import HighLight from "@/components/HighLight";
import Ellipsis from '@/components/Ellipsis'
import SecretText from '@/components/SecretText'
import EllipsisPane from '@/components/EllipsisPane'
import gButton from '@/components/Button/button.ce.vue'

export default defineComponent({
  components: {
    Condition,
    "c-item": Condition.Item,
    Tree,
    HighLight,
    Ellipsis,
    SecretText,
    EllipsisPane,
    gButton
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
    const line = ref(1)
    const handleExpand = () => {
      if (line.value === 1) {
        line.value = 5
      } else {
        line.value = 1
      }
    }

    const handleTest = () => {
      console.log('====')
    }
    return {
      value,
      visible,
      handleOk,
      treeData,
      keyword,
      selected_Keys,
      handleSelect,
      ellipsisVal,
      line,
      handleExpand,
      handleTest
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