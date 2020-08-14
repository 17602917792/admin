<template>
  <div id="app">
      <a-config-provider :locale="zh_CN">
      <router-view class="view app-view"></router-view>
      </a-config-provider>
      <div class="loading-bar" id="loading-bar"></div>
  </div>
</template>
<script>
    import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    moment.locale('zh-cn');
    export default {
       name: "App",
       data(){
           return{
               zh_CN,
           }
       },
       mounted() {
         document.title = '域控管理'
       },
       //监听路由的路径，切换title
       watch: {
           '$route' () {
               let { $route:{meta:{title}} } = this;
               document.title = title?`域控管理-${title}`:'域控管理';
           }
       }
  };
</script>
<style lang="less">
.content-layout{
    min-height: 726px;
}
.loading-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    width: 0;
    height: 2px;
    background-color:#1890ff;
    transition: width .2s linear;
}
</style>
