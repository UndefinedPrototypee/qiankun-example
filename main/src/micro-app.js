import store from './store'

const microApps = [
  {
    name: 'sub-vue',
    entry: process.env.VUE_APP_SUB_VUE,
    activeRule: '/sub-vue'
  },
  {
    name: 'sub-react',
    entry: process.env.VUE_APP_SUB_REACT,
    activeRule: '/sub-react'
  },
  {
    name: 'sub-html',
    entry: process.env.VUE_APP_SUB_HTML,
    activeRule: '/sub-html'
  },
  /*
  {
    name: 'sub-angular',
    entry: process.env.VUE_APP_SUB_ANGULAR,
    activeRule: '/sub-angular'
  },
  {
    name: 'sub-umi',
    entry: process.env.VUE_APP_SUB_UMI,
    activeRule: '/sub-umi'
  },
  */
  {
    name: 'sub-doctor',
    entry: process.env.VUE_APP_SUB_DOCTOR,
    activeRule: '/sub-doctor'
  },
  {
    name: 'sub-nurse',
    entry: process.env.VUE_APP_SUB_NURSE,
    activeRule: '/sub-nurse'
  },
  {
    name: 'sub-hospital',
    entry: process.env.VUE_APP_SUB_HOSPITAL,
    activeRule: '/sub-hospital'
  },
  {
    name: 'sub-patient',
    entry: process.env.VUE_APP_SUB_PATIENT,
    activeRule: '/sub-patient'
  },
  {
    name: 'sub-vue3',
    entry: process.env.VUE_APP_SUB_VUE3,
    activeRule: '/sub-vue3'
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps
