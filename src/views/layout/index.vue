<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <h2 class="logo">Admin</h2>
      <div>
        <Menu/>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <a-row>
          <a-col :span="8">
            <a-icon
                class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="()=> collapsed = !collapsed"></a-icon>
          </a-col>
          <a-col :span="4" :offset="12">
            <div class="user-info">
              <a-dropdown v-model="visible">
                <a class="ant-dropdown-link" href="javascript:;">Admin<a-icon type="down"></a-icon> </a>
                <a-menu slot="overlay" @click="handleMenuClick">
                  <a-menu-item key="1">修改密码</a-menu-item>
                  <a-menu-item key="2">退出登录</a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </a-col>
        </a-row>

      </a-layout-header>
      <a-layout-content :style="style">
          <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
    import Menu from '@/components/menu';
    import { mapState } from 'vuex';
    export default {
      name:"admin",
      data() {
        return {
          collapsed: false,
          style:{
              margin: '16px',
              padding: '24px',
              background: '#fff',
              minHeight: '841px'
          },
          visible: false,
        };
      },
      components:{
          Menu
      },
      computed:{
          ...mapState('home',['localMap'])
      },
      methods: {
        handleMenuClick(e) {
          console.log(e.key);
        }
      },
       mounted() {
          console.log(this.localMap);
       }
    };
</script>
<style lang="less" scoped>
  .ant-layout-header{
    padding: 0;
  }
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    color: #fff;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #fff;
  }

  #components-layout-demo-custom-trigger .logo {
    line-height: 35px;
    padding: 16px 0 0;
    text-align: center;
    font-size: 24px;
    color: #fff;
    font-weight: bold;
  }
  .user-info{
    .ant-dropdown-link{
      color: #fff;
    }
    text-align: right;
    padding: 0 36px;
  }
</style>
