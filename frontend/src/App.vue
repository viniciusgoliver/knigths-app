<!-- App.vue -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Bem-vindo ao seu aplicativo Vue.js!"/>
    <KnightList :knights="knights"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import KnightList from './components/KnightList.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    KnightList
  },
  data() {
    return {
      knights: [
        { nome: 'Laurenti', idade: 29, armas: 2, atributo: 'Força' },
        // Adicione mais knights conforme necessário
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Arial', sans-serif;
  text-align: center;
  margin-top: 20px;
}

img {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}
</style>
