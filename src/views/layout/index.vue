<template>
        <a-layout id="components-layout-demo-custom-trigger">
            <a-layout-header class="header">
                <div :class="!collapsed?'logo':'logo current'"><span v-show="!collapsed">域控管理</span></div>
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"  @click="collaps" />
                <a-menu
                        theme="dark"
                        mode="horizontal"
                        :style="{ lineHeight: '64px' }"
                        v-model="select"
                        class="menu"
                >
                    <a-menu-item v-for="(item,index) in menuData" @click="handleSelect(index)" :key="item.title"><a-icon :type="item.icon"></a-icon>{{item.title}}</a-menu-item>
                </a-menu>
                <a-dropdown placement="bottomLeft" class="user-info">
                    <a-button><a-icon type="user"></a-icon>{{userName}}</a-button>
                    <a-menu slot="overlay">
                        <a-menu-item><router-link to="/admin/user"><a-icon type="setting" style="color: rgba(0, 0, 0, 0.65);margin-right: 6px"></a-icon>个人设置</router-link></a-menu-item>
                        <a-menu-item @click="handelLogout"><a-icon type="logout"></a-icon>退出登录</a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-layout-header>
            <a-layout>
                <a-layout-sider :trigger="null" collapsible v-model="collapsed" style="position: fixed;left: 0; top:64px;height: 100vh">
                    <com-menu
                        :menuDatas="childMenuDatas"
                        :collapsed="collapsed"
                        @sendPath="getPath"
                    />
                </a-layout-sider>
            <a-layout >
                <a-layout-content
                        :style="{marginTop: '64px', padding: '0','marginLeft': !collapsed?'200px':'80px'}"
                >
                    <router-view></router-view>
                    <com-foot/>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script>
    import ComFoot from '@/components/ComFoot';
    import ComMenu from '@/components/ComMenu';
    import {mapState,mapActions,mapMutations} from 'vuex';
    export default {
        name: "Layout",
        data(){
            return{
                collapsed: false,
                userName:'五四互娱',
                childMenuDatas:[],
                current:0,
                select:[this.$route.meta.activeName? this.$route.meta.activeName : ''],
                menuData:[
                    {
                        title: "系统管理",
                        icon: "setting",
                        key: "",
                        child: [
                            {
                                name: "用户管理",
                                url: "admin/user",
                                icon: "user",
                                key: ""
                            },
                        ]
                    }
                ]
            }
        },
        components:{
            ComFoot,
            ComMenu
        },
        computed:{
            ...mapState(['userInfo'])
        },
        async mounted() {
            this.userName = localStorage.getItem('userName');
            this.changeChileMenu();
        },
        watch:{
            '$route' () {
                this.changeChileMenu();
                this.select = [this.$route.meta.activeName]
            }
        },
        methods:{
            ...mapActions('login',['logout']),
            ...mapMutations(['UPDATECOLLAPSED']),
            collaps(){
                this.collapsed = !this.collapsed;
                this.UPDATECOLLAPSED();
            },
            handelLogout(){
                localStorage.removeItem('userName');
                // this.logout().then(res=>{
                    this.$router.push('/login');
                // });
            },
            handleSelect(index){
                this.childMenuDatas = this.menuData[index].child;
                this.current = index;
            },
            getPath(path){
                //子组件选择菜单栏之后header菜单选中状态
                if(!this.menuData)return;
                this.menuData.map((item)=>{
                    item.child.map(value=>{
                        if('/'+value.url===path.key){
                            // this.select = item.title;
                            this.select = [item.title];
                        }
                        if(value.child){
                            value.child.map(list=>{
                                if('/'+list.url===path.key){
                                    this.select = [item.title];
                                }
                            })
                        }
                    })
                });
            },
            changeChileMenu(){
                this.menuData.map((item,index)=>{
                    if(item.title==this.$route.meta.activeName){
                        this.current = index;
                    }
                });
                this.childMenuDatas = this.menuData[this.current].child;
            }
        }
    };
</script>
<style lang="less" scoped>
    .header{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 999;
        padding: 0;

    }
    .logo {
        float: left;
        width: 200px;
        .fs(24px,#fff);
        padding-left: 70px;
        background: url("../../assets/images/logo_w.png") no-repeat 30px center;
        background-size: 30px auto;
        height: 64px;
        transition: all .2s ease 0s;
        &.current{
            width: 80px;
        }
    }
    .menu{
        display: inline-block;
    }
    .trigger{
        color: #fff;
        margin: 0 36px;
        font-size: 20px;
        display: inline-block;
        vertical-align: middle;
    }
    .user-info{
        .pa();
        right: 32px;
        top: 0;
        .lh(64px);
        background: none;
        color: #fff;
        outline: none;
        border: 0;
        border-radius: 0;
        &:hover{
            background: #26a2ff;
            color: #fff;
        }
    }
</style>
