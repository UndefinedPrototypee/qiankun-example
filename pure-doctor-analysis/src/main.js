import './public-path'
import Vue from 'vue'
import App from './App.vue'
import routes from './router'
// import { store as commonStore } from 'common'
import store from './store'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
// let instance = null

function render (props = {}) {
  const { container, routerBase } = props
  console.log('-----------------render------------', props, routerBase, window.__POWERED_BY_QIANKUN__, process.env.BASE_URL)
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: 'history',
    routes
  })

  const instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
  window.instance = instance
}

if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // 独立运行时，也注册一个名为global的store module
  // commonStore.globalRegister(store)
  // 模拟登录后，存储用户信息到global module
  // const userInfo = { name: '我是独立运行时名字叫张三' } // 假设登录后取到的用户信息
  // store.commit('global/setGlobalState', { user: userInfo })
  //
  render()
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function unmount () {
  // instance.$destroy()
  // instance.$el.innerHTML = ''
  // instance = null
  console.log('==========ort async funct55555ion unmount==============')
}
