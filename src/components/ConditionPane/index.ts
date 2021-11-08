
import type { App } from 'vue';
import Index from './Condition.vue'
import Itempane from './Item.vue'

Index.install = function(app: App) {
  app.component(Index.name, Index)
  app.component(Itempane.name, Itempane)
}

Index.Item = Itempane
export default Index
