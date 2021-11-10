#### 省略文字组件
支持展开收起

基础用法

```html
<Ellipsis v-model='expandval' :line='3' expandble expandHeight='200px'>
  <template #text>
    这里发现了一个很有意思的事情当文字是中文时上面的代码是可以实现环绕效果的，实现环绕效果发现了一个很有意思的事情，当文字是中文时，上面的代码是可以实现环绕效果的，结果如这里发现了一个很有意思的事情，当文字是中文时，上面的代码是可以实现环绕效果的
  </template>
</Ellipsis>
```

##### condition
| props  | 说明     | 值     |
| ------ | -------- | ------ |
| v-model   | 展开收起 | boolean |
| line | 文字省略展示几行 | number |
| expandble  | 是否展示更多收起 | Boolean |
| text  | 文字 | string (slot) |
| expandHeight  | 展开后的高度 | string |
| tip  | tooltip 显示的文字（无则不显示） | string |

> 如果text 是slot 情况
需要配置expandHeight   否则展开无动画效果

> 如果text 是string
可不配置expandHeight  展开高度为计算后的文字高度
若配置expandHeight    展开高度为配置高度

> tip & expandble
一般tip 与 expandble 不一起使用，具体看使用场景，tip 显示 tooltip 的提示内容，expandble 展开显示全部数据
单行一般是tip
多行一般是expandble