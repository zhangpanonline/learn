import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import WujieVue from 'wujie-vue3'
const { setupApp, preloadApp, bus } = WujieVue

const app = createApp(App)

app.use(router).use(WujieVue)

const lifecycles = {
  beforeLoad: () => {console.log('加载子应用前调用')},
  beforeMount() {console.log('子应用挂载前调用')},
  afterMount()  {console.log('子应用挂载后调用')},
  beforeUnmount() {
    console.log('子应用卸载前调用')
  },
  afterUnmount() {
    console.log('子应用卸载后调用')
  },
  activated() {
    console.log('保活子应用进入时触发')
  },
  deactivated() {
    console.log('保活子应用离开时触发')
  },
  loadError() {
    console.log('子应用加载失败时触发')
  }
}

bus.$on('wujie_sub1', (data) => {
  console.log('子应用传递给父应用的数据', data)
})

setupApp({
  name: 'sub1',
  url: '//localhost:1001',
//   子应用的html，设置后子应用将直接读取该值，没有设置则子应用通过url请求获取
//   html: '',
// 子应用渲染容器，子应用渲染容器的最好设置好宽高防止渲染问题，在webcomponent元素上无界还设置了wujie_iframe的class方便用户自定义样式
// el: '#subapp-container',
// 自定义的loading元素，如果不想出现默认加载，可以赋值一个空元素：document.createElement('span')
// loading: document.createElement('div'),
//  路由同步模式，开启后无界会将子应用的name作为一个url查询参数，实时同步子应用的路径作为这个查询参数的值，这样分享 URL 或者刷新浏览器子应用路由都不会丢失
sync: true,
// 短路径的能力，当子应用开启路由同步模式后，如果子应用链接过长，可以采用短路径替换的方式缩短同步的链接，用法详见示例：https://wujie-micro.github.io/doc/guide/sync.html#%E7%9F%AD%E8%B7%AF%E5%BE%84
// prefix: 'sub1',
alive: true,
props: {
  clickProps() {
    alert('父级传递给子应用的数据')
  }
},
...lifecycles
})
app.mount('#app')
