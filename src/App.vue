<script>
import Application from './components/Application.vue'

export default {
  name: 'App',
  components: {
    Application
  }
}
</script>


<template>
  <Application msg="Coucou zeubi"/>
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

#body{
  background-color: #b7c0c8;
}

</style>
