<template>
  <div id="app">
    <notifications group="msg" position='bottom right'/>
    <div id="container">
      <Header></Header>
      <router-view/>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {Header, Footer}
}
</script>
