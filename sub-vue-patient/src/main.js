import './public-path'
import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import { store as commonStore } from 'common'
import store from './store'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
let instance = null

function render (props = {}) {
  const { container, routerBase } = props
  console.log('-----------------render------------', props, routerBase, window.__POWERED_BY_QIANKUN__, process.env.BASE_URL)
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    mode: 'history',
    routes
  })

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')

  instance.testVar = (function () {
    const str = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad alias amet consectetur consequatur cupiditate debitis deleniti dicta, dolorem ducimus eius harum hic in iure laborum libero maxime natus nisi non nulla obcaecati odit officiis optio placeat porro qui, quidem quod reprehenderit sapiente similique sint soluta suscipit tenetur ut, vitae voluptas voluptatibus! Adipisci aliquam culpa deserunt ex nesciunt nostrum quae, quia repudiandae sunt voluptas. Aspernatur distinctio, earum eveniet fuga inventore magni necessitatibus nostrum perferendis quas rem? A dolores ex id quisquam reiciendis. Asperiores impedit natus quia repellat. Ab aperiam, asperiores assumenda consequuntur culpa dignissimos error eveniet facere nam natus pariatur perspiciatis quas quod repellendus tempora. Consequuntur cumque doloremque earum eius eligendi harum ipsam iure libero neque obcaecati odit officia optio perferendis provident quae, quo reprehenderit, voluptatibus! Alias aspernatur aut beatae corporis deserunt dicta dignissimos dolor ducimus eum inventore ipsa itaque iure labore, mollitia nobis perspiciatis rem sunt suscipit temporibus vel. Aliquid autem eveniet minima non obcaecati officiis quo recusandae reiciendis sint sunt! At eius, et fugiat hic maiores molestiae porro repellat reprehenderit voluptate. Accusamus ad aperiam architecto asperiores debitis earum eligendi et eum, ex facilis impedit ipsam iste magni minus nemo nisi nulla officia quae ratione repellat repellendus temporibus ullam!'
    const arr = []
    for (let i = 0; i < 500; i++) {
      for (let j = 0; j < 500; j++) {
        arr.push({
          [`Patient_Instance_Object_${i}${j}`]: str
        })
      }
    }
    return arr
  })()
  console.log('size instance.testVar', instance.testVar)
  console.log('size instance.testVar.length', JSON.stringify(instance.testVar).length / 1024 ** 2, '(mb)')
}

if (!window.__POWERED_BY_QIANKUN__) {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑

  // 独立运行时，也注册一个名为global的store module
  commonStore.globalRegister(store)
  // 模拟登录后，存储用户信息到global module
  const userInfo = { name: '我是独立运行时名字叫张三' } // 假设登录后取到的用户信息
  store.commit('global/setGlobalState', { user: userInfo })

  render()
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  console.log('[vue] props from main framework', props)

  commonStore.globalRegister(store, props)

  render(props)
}

export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
