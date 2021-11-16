
import { defineCustomElement } from 'vue'
import Condition from './ConditionPane'
import Ellipsis from './EllipsisPane/ellipsis.ce.vue'
import Button from './Button/button.ce.vue'
import 'ant-design-vue/dist/antd.css'
// import HighLight from './HighLight'
// import Secret from './SecretText'
// import Tree from './TreePane'

const gEllipsis = defineCustomElement(Ellipsis)
const gButton = defineCustomElement(Button)

// const gHighlight = defineCustomElement(HighLight)
// const gSecret = defineCustomElement(Secret)
// const gTree = defineCustomElement(Tree)

export {
  gEllipsis,
  gButton
  // gHighlight,
  // gSecret
}

export function register() {
  customElements.define('g-ellipsis', gEllipsis)
  customElements.define('g-button', gButton)
  // customElements.define('g-highlight', gHighlight)
  // customElements.define('g-secret', gSecret)
  // customElements.define('g-tree', gTree)
}
// register()
// export default {
//   Condition,
//   Ellipsis,
//   HighLight,
//   Secret,
//   Tree
// }