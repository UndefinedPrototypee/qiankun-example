<template>
  <div class="layout-wrapper">
    <a style="display: inline-block;width: 80px;height: 80px;position: absolute;top: 0;right: 0;z-index: 1;" href="https://github.com/fengxianqi/qiankun-example" class="github-corner" aria-label="View source on GitHub">
      <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg>
    </a>
    <div class="layout-header">
      <div class="logo" @click="toHome">QIANKUN-EXAMPLE</div>
      <ul class="sub-apps-top">
        <li v-for="item in microApps" :class="{active: item.activeRule === current}" :key="item.name"
            @click="gotoMicroApp(item)">{{ item.name }}</li>
      </ul>
      <div class="userinfo" @click="queryMainState">主应用的state</div>
    </div>
    <section class="main-content">
      <dl class="sub-apps-left">
        <dd :class="['li', 'default-' + setDefaultFlag]" @click="setDefault"><button>setDefault [{{ setDefaultFlag }}]</button></dd>
        <dd class="li opt-micro" @click="loadDoctorMicro"><button>load micro doctor</button></dd>
        <dd class="li opt-micro" @click="unmountDoctor"><button>unmount doctor</button></dd>
        <dd :class="['li', !!microAppState[item.name] ? 'app-mounted' : '' ]" v-for="item in microApps" :key="item.name"
            @click="clickMicroApp(item)"
            >{{ !!microAppState[item.name] ? 'unmount' : 'load' }} {{ item.name }}</dd>
      </dl>
      <div :class="isSetDefault ? '' : 'main-frame'" id="subapp-viewport">
        {{ isSetDefault ? '' : '没有setDefalutMicro,展示主框架' }}
      </div>
    </section>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import { loadMicroApp } from 'qiankun'
import microApps from './micro-app'
import store from '@/store'

export default {
  name: 'App',
  data () {
    return {
      isLoading: true,
      microApps,
      setDefaultFlag: localStorage.getItem('set_default_mount_app') || 'on',
      instance: null,
      loadedAppMap: new Map(),
      microAppState: {},
      headerApps: [],
      leftApps: [],
      current: '/sub-vue/'
    }
  },
  computed: {
    state () {
      // 如果只需要取某个命名空间下的state，比如 user ，可以加上参数
      // return store.getGlobalState('user')

      // 返回所有的state则不需添加参数
      return store.getGlobalState()
    },
    isSetDefault () {
      return localStorage.getItem('set_default_mount_app') === 'on'
    }
  },
  watch: {
    isLoading (val) {
      if (val) {
        NProgress.start()
      } else {
        this.$nextTick(() => {
          NProgress.done()
        })
      }
    }
  },
  components: {},
  methods: {
    setDefault () {
      this.setDefaultFlag = localStorage.getItem('set_default_mount_app') === 'on' ? 'off' : 'on'
      localStorage.setItem('set_default_mount_app', this.setDefaultFlag)
      if (this.setDefaultFlag) {
        this.gotoMicroApp(microApps[0])
      }
    },
    toHome () {
      console.log(this)
      location.href = '/'
    },
    async clickMicroApp (item) {
      const appInstance = this.loadedAppMap.get(item.name)
      if (appInstance) {
        console.warn('unmount micro app, appName=', appInstance.name, appInstance)
        this.loadedAppMap.set(item.name, null)
        try {
          appInstance.unmount()
        } catch (e) {
          console.error(`[${new Date().toLocaleString()} Occur Error]`, e)
        }
      } else {
        this.loadedAppMap.set(item.name, loadMicroApp(item))
        console.log('load micro app, appName=', item.name, this.loadedAppMap.get(item.name))
        this.gotoMicroApp(item)
      }
      const loadedApps = Array.from(this.loadedAppMap)
      this.microAppState = loadedApps.reduce((pre, next) => {
        const [name, instance] = next
        pre[name] = instance
        return pre
      }, {})
      console.log('===> load state ', this.microAppState)
    },
    loadDoctorMicro (item) {
      const app = microApps[3]
      this.instanceDoctor = loadMicroApp(app)
      this.gotoMicroApp(app)
      console.log('loadOneMicro this.instance', this.instanceDoctor)
    },
    unmountDoctor () {
      this.instanceDoctor && this.instanceDoctor.unmount()
      console.log('ummountApp this.instance', this.instanceDoctor)
    },
    gotoMicroApp (item) {
      console.log('--history.pushState(null, item.activeRule, item.activeRule)', item)
      history.pushState(null, item.activeRule, item.activeRule)
      // this.current = item.name
    },
    bindCurrent () {
      const path = window.location.pathname
      if (this.microApps.findIndex(item => item.activeRule === path) >= 0) {
        this.current = path
      }
    },
    listenRouterChange () {
      const _wr = function (type) {
        const orig = history[type]
        return function () {
          const rv = orig.apply(this, arguments)
          const e = new Event(type)
          e.arguments = arguments
          window.dispatchEvent(e)
          return rv
        }
      }
      history.pushState = _wr('pushState')

      window.addEventListener('pushState', this.bindCurrent)
      window.addEventListener('popstate', this.bindCurrent)

      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('pushState', this.bindCurrent)
        window.removeEventListener('popstate', this.bindCurrent)
      })
    },
    queryMainState () {
      window.alert(JSON.stringify(this.state))
    }
  },
  beforeCreate () {
  },
  created () {
    this.bindCurrent()
    NProgress.start()
  },
  mounted () {
    this.listenRouterChange()
  }
}
</script>

<style lang="scss">
html, body{
  margin: 0 !important;
  padding: 0;
}
.opt-micro {
  background: #b1bfcc;
  color: white;
}
.default-on {
  background: red;
  color: white;
}
.default-off {
  background: #c2c3c4;
}
.main-frame {
  text-align: center;
  padding: 100px 0;
}
.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}
  .layout-wrapper{
    .layout-header{
      height: 50px;
      width: 100%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      line-height: 50px;
      position: relative;
     .logo {
        float: left;
        margin: 0 50px;
       font-weight: bold;
       cursor: pointer;
      }
      .sub-apps-top {
        list-style: none;
        margin: 0;
        li{
          list-style: none;
          display: inline-block;
          padding: 0 10px;
          border: 1px solid gainsboro;
          cursor: pointer;
          &.active{
            color: #42b983;
            background: #eff5e5;
            text-decoration: underline;
          }
        }
      }
      .userinfo{
        position: absolute;
        right: 100px;
        top: 0;
      }
    }
    .main-content {
      display: grid;
      grid-template-columns: 15% 85%;
      flex-grow: 1;
      .sub-apps-left {
        padding: 10px 0;
        cursor: pointer;
        border-right: 1px solid;
        .li {
          text-align: center;
          line-height: 60px;
          border: 1px solid gainsboro;
        }
        .app-mounted {
          background: chocolate;
        }
      }
    }
    .li button {
      padding: 10px;
      font-size: 16px;
      width: 200px;
      box-sizing: border-box;
    }
  }
</style>
