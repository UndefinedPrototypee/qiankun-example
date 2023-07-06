import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    __hospitalTestBigVar: (function () {
      const str = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad alias amet consectetur consequatur cupiditate debitis deleniti dicta, dolorem ducimus eius harum hic in iure laborum libero maxime natus nisi non nulla obcaecati odit officiis optio placeat porro qui, quidem quod reprehenderit sapiente similique sint soluta suscipit tenetur ut, vitae voluptas voluptatibus! Adipisci aliquam culpa deserunt ex nesciunt nostrum quae, quia repudiandae sunt voluptas. Aspernatur distinctio, earum eveniet fuga inventore magni necessitatibus nostrum perferendis quas rem? A dolores ex id quisquam reiciendis. Asperiores impedit natus quia repellat. Ab aperiam, asperiores assumenda consequuntur culpa dignissimos error eveniet facere nam natus pariatur perspiciatis quas quod repellendus tempora. Consequuntur cumque doloremque earum eius eligendi harum ipsam iure libero neque obcaecati odit officia optio perferendis provident quae, quo reprehenderit, voluptatibus! Alias aspernatur aut beatae corporis deserunt dicta dignissimos dolor ducimus eum inventore ipsa itaque iure labore, mollitia nobis perspiciatis rem sunt suscipit temporibus vel. Aliquid autem eveniet minima non obcaecati officiis quo recusandae reiciendis sint sunt! At eius, et fugiat hic maiores molestiae porro repellat reprehenderit voluptate. Accusamus ad aperiam architecto asperiores debitis earum eligendi et eum, ex facilis impedit ipsam iste magni minus nemo nisi nulla officia quae ratione repellat repellendus temporibus ullam!'
      const arr = []
      for (let i = 0; i < 500; i++) {
        for (let j = 0; j < 500; j++) {
          arr.push({
            [`${i}${j}`]: str
          })
        }
      }
      const bigVar = 'Hospital_Vuex_Object@@' + JSON.stringify(arr)
      // console.log('size instance.testVar', bigVar)
      console.log('size instance.testVar.length', JSON.stringify(bigVar).length / 1024 ** 2, '(mb)')
      return { Hospital_Vuex_Object: arr }
    })()
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
