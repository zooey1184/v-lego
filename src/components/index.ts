
import { defineCustomElement } from 'vue'
import Condition from './ConditionPane'
import Ellipsis from './Ellipsis'
// import HighLight from './HighLight'
// import Secret from './SecretText'
// import Tree from './TreePane'

const gEllipsis = defineCustomElement(Ellipsis)
// const gHighlight = defineCustomElement(HighLight)
// const gSecret = defineCustomElement(Secret)
// const gTree = defineCustomElement(Tree)

export {
  gEllipsis,
  // gHighlight,
  // gSecret
}

export function register() {
  customElements.define('g-ellipsis', gEllipsis)
  // customElements.define('g-highlight', gHighlight)
  // customElements.define('g-secret', gSecret)
  // customElements.define('g-tree', gTree)
}
// export default {
//   Condition,
//   Ellipsis,
//   HighLight,
//   Secret,
//   Tree
// }