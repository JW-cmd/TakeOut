<template>
  <div id="app">
    <router-view></router-view>
    <footer-guide v-show="$route.meta.isNeedFooterGuide"></footer-guide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'

export default {
  name: 'App',
  components: {
    FooterGuide,
  },
}
</script>

<style lang='stylus'>
  #app
    width 100%
    height 100%
    position relative
    overflow hidden
</style>
