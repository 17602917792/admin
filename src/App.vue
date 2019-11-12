<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: "App",
    mounted() {
      let _metaTitle = this.$route.meta.title;
      document.title = _metaTitle ? _metaTitle :'广告系统管理'
    }
  };
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
