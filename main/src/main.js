import Vue from 'vue'
import 'nprogress/nprogress.css'
import App from './App.vue'
// import { registerMicroApps, setDefaultMountApp, start } from 'qiankun'
import { registerMicroApps, setDefaultMountApp, start } from '../../../qiankun-master/es'
import microApps from '@/micro-app'

Vue.config.productionTip = false

const instance = new Vue({
  render: h => h(App)
}).$mount('#app')

// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
function loader (loading) {
  if (instance && instance.$children) {
    // instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
    instance.$children[0].isLoading = loading
  }
}

// 给子应用配置加上loader方法
const apps = microApps.map(item => {
  return {
    ...item,
    loader
  }
})

if (localStorage.getItem('set_default_mount_app') === 'on') {
  registerMicroApps(apps.slice(0, 1), {
    beforeLoad: app => {
      console.log('before load app.name====>>>>>', app.name)
    },
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
      }
    ],
    afterMount: [
      app => {
        console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name)
      }
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
      }
    ]
  })
  setDefaultMountApp('/sub-vue')
  start({ sandbox: false })
  setTimeout(() => {
    console.log('-----0-setDefaultMountApp-------')
    setDefaultMountApp('/sub-vue')
  }, 3000)
  setTimeout(() => {
    console.log('-----0-start-------')
    start({ sandbox: false })
  }, 6000)
}
