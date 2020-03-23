<template>
  <div id="app">
    <tip-tap />
  </div>
</template>

<script>
import TipTap from './components/TipTap.vue'

export default {
  name: 'App',
  components: {
    TipTap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
