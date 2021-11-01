### 条件布局面板

#### 使用场景
后台表格搜索，格式化布局

---

基础用法

```html
<Condition>
  <Item label='关键词'>
    <a-input placeholder='请输入' />
  </Item>
  <Item type='end'>
    <a-button type='primary'>确定</a-button>
  </Item>
</Condition>
```

##### condition
| props  | 说明     | 值     |
| ------ | -------- | ------ |
| labelWidth   | 统一设置子项的文本宽度 | string, number |
| labelAlign | 文本text-align 属性 | left, right, center |
| xxl, xl, lg, md, span  | 响应式 | number |


##### item
| props  | 说明     | 值     |
| ------ | -------- | ------ |
| labelWidth   | 统一设置子项的文本宽度 | string, number |
| labelAlign | 文本text-align 属性 | left, right, center |
| xxl, xl, lg, md, span  | 响应式 | number |
| type  | 设置置于末尾的情况 | end |
| colon  | 是否需要冒号 | true , false |