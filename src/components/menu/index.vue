<template>
  <a-menu
    :defaultSelectedKeys="['1.1']"
    :openKeys="openKeys"
    mode="inline"
    theme="dark"
    :inlineCollapsed="collapsed"
     @openChange="onOpenChange"
  >
    <template v-for="item in menu">
      <a-menu-item v-if="!item.children" :key="item.key">
        <router-link :to="item.url">
          <a-icon type="pie-chart" />
          <span>{{item.title}}</span>
        </router-link>
      </a-menu-item>
      <a-sub-menu v-else :key="item.key">
        <span slot="title">
          <a-icon :type="item.icon" />
          <span>{{item.title}}</span>
        </span>
        <template v-for="child in item.children">
          <a-menu-item v-if="!child.children" :key="child.key">
            <router-link :to="child.url">
                <a-icon :type="child.icon" />
                <span>{{child.title}}</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu v-else :key="child.key">
            <span slot="title">
                <a-icon :type="child.icon" />
                <span>{{child.title}}</span>
            </span>
            <template v-for="list in child.children">
                <a-menu-item :key="list.key">
                    <router-link :to="list.url">
                        <a-icon :type="list.icon" />
                        <span>{{list.title}}</span>
                    </router-link>
                </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-sub-menu>
    </template>
  </a-menu>
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {
        collapsed: true,
        openKeys:['sub1'],
        rootSubmenuKeys:[],
        menu: [
            {
                key: "sub1",
                title: "客服工具",
                icon:'pie-chart',
                children:[
                    {
                        key:'1.1',
                        title:'账号工具',
                        url:'/userRole',
                        icon:'pie-chart'
                    },
                    {
                        key:'1.2',
                        title:'角色工具',
                        url:'',
                        icon:'pie-chart'
                    },
                    {
                        key:'1.3',
                        title:'随机角色名',
                        url:'',
                        icon:'pie-chart'
                    },
                    {
                        key:'1.4',
                        title:'停服公告管理',
                        url:'',
                        icon:'pie-chart'
                    },
                    {
                        key:'1.5',
                        title:'游戏外公告管理',
                        url:'',
                        icon:'pie-chart'
                    },
                    {
                        key:'1.6',
                        title:'游戏跑马灯管理',
                        url:'',
                        icon:'pie-chart'
                    },
                    {
                        key:'1.7',
                        title:'屏蔽字管理',
                        url:'',
                        icon:'pie-chart'
                    },
                    {
                        key:'1.8',
                        title:'客服助手',
                        url:'',
                        icon:'pie-chart'
                    },
                    {
                        key:'1.9',
                        title:'用户信息',
                        url:'',
                        icon:'pie-chart'
                    },
                    {
                        key:'1.10',
                        title:'黑名单那管理',
                        url:'',
                        icon:'pie-chart'
                    },
                    {
                        key:'1.11',
                        title:'禁言管理',
                        url:'',
                        icon:'pie-chart'
                    },
                    {
                        key:'1.12',
                        title:'邮件管理',
                        url:'',
                        icon:'pie-chart'
                    },
                    {
                        key:'1.13',
                        title:'充值管理',
                        icon:'pie-chart',
                        children:[
                            {
                                key:'1.13.1',
                                title:'充值预订单',
                                url:'',
                                icon:'pie-chart',
                            },
                            {
                                key:'1.13.2',
                                title:'充值到账',
                                url:'',
                                icon:'pie-chart',
                            },
                            {
                                key:'1.13.3',
                                title:'订单管理',
                                url:'',
                                icon:'pie-chart',
                            }
                        ]
                    }
                ]
            },
            {
                key: "sub2",
                title: "数据分析",
                icon:'pie-chart',
                children: [
                {
                    key: "2.1",
                    title: "游戏情况",
                    url:'/index/news',
                    icon:'pie-chart',
                    children:[
                        {
                            key:"2.1.1",
                            title:"实时数据",
                            url:"",
                            icon:""
                        },
                        {
                            key:"2.1.2",
                            title:"数据报表",
                            url:"",
                            icon:""
                        },
                        {
                            key:"2.1.3",
                            title:"运营数据",
                            url:"",
                            icon:""
                        },
                        {
                            key:"2.1.4",
                            title:"top数据",
                            url:"",
                            icon:""
                        },
                        {
                            key:"2.1.5",
                            title:"平台数据对比",
                            url:"",
                            icon:""
                        },
                        {
                            key:"2.1.6",
                            title:"区服数据对比",
                            url:"",
                            icon:""
                        },
                        {
                            key:"2.1.7",
                            title:"数据对比",
                            url:"",
                            icon:""
                        },
                        {
                            key:"2.1.8",
                            title:"实时趋势",
                            url:"",
                            icon:""
                        },
                        {
                            key:"2.1.9",
                            title:"在线详细",
                            url:"",
                            icon:""
                        }
                    ]
                },
                {
                    key: "2.2",
                    title: "玩家分析",
                    icon:'pie-chart',
                    children: [
                    {
                        key: "2.2.1",
                        title: "角色任务统计",
                        url:'/index/news',
                        icon:'pie-chart'
                    },
                    {
                        key: "2.2.2",
                        title: "注册IP统计",
                        url:'/index/news',
                        icon:'pie-chart'
                    }
                    ]
                },
                {
                    key:'2.3',
                    title:"付费分析",
                    url:'/',
                    icon:'pie-chart'
                }
                ]
            }
        ]
    };
  },
  mounted(){
    this.menu.map(item=>{
        this.rootSubmenuKeys.push(item.key);
    });
  },
  methods:{
      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys;
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      },
  }
};
</script>
<style lang="less" scoped>
</style>