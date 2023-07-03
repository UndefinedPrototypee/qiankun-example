<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Home 路由"/>
    <section class="test">
      <input v-model="value1" @focus="focus1"/>
      <input v-model="value2" @focus="focus2"/>
      <input v-model="value3" @focus="focus3"/>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      value1: '',
      value2: '',
      value3: ''
    }
  },
  methods: {
    focus1 () {
      console.log('--focus1--')
    },
    focus2 () {
      console.log('--focus2--')
    },
    focus3 () {
      console.log('--focus3--')
    }
  }
}
</script>
<style>
.test {
  display: flex;
  justify-content: space-around;
}
</style>
