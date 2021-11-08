import { createApp } from 'vue' // Vue 3.x 引入 vue 的形式
// import router from './router/index'
// import store from './store/index'
import App from './App.vue' // 引入 APP 页面组建
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
import './styles/index.less'

const app = createApp(App) // 通过 createApp 初始化 app
app.use(Antd)
app.mount('#app')
