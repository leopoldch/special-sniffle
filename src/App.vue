<script>
import MainView from './components/MainView.vue'

export default {
  name: 'App',
  components: {
    MainView,
  },
}
</script>

<template>
  <MainView message="coucou" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#body {
  background-color: #f7f7f7;
}
</style>
