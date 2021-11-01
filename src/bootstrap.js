import { createApp } from 'vue' // Vue 3.x 引入 vue 的形式
// import router from './router/index'
// import store from './store/index'
import App from './App.vue' // 引入 APP 页面组建
import { message } from 'ant-design-vue'
// import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
import './index.less'

const app = createApp(App) // 通过 createApp 初始化 app
// app.use(Antd)
app.config.globalProperties.$message = message;
// app.use(router).use(store).mount('#app') // 将页面挂载到 root 节点
app.mount('#app')

/**
 *  "dependencies": {
    "@babel/runtime": "^7.15.4",
    "@babel/runtime-corejs3": "^7.15.4",
    "@vue/compat": "^3.2.20",
    "axios": "^0.21.4",
    "core-js": "^3.18.0",
    "dayjs": "^1.10.7",
    "sass": "^1.43.4",
    "sass-loader": "^12.3.0",
    "vue": "^3.2.20",
    "vue-router": "^3.5.2",
    "vuex": "^4.0.2"
  }
 */