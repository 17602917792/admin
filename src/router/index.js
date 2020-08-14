import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    meta: {
      title: "域控管理",
      auth:true
    },
    redirect:'login',
    component:()=>import('@/views/layout'),
    children:[
        // 系统设置
      {
        path:"/admin",
        name:'admin',
        component:()=>import('@/views/system'),
        children:[
            // 用户管理
          {
            path:'user',
            name:'user',
            meta:{
              openPath:'',
              activePath:'/admin/user',
              activeName:'系统管理',
              title:'用户管理'
            },
            component:()=>import('@/views/system/user')
          },
          {
            path:'user/permission',
            name:'userPermission',
            meta:{
              openPath:'',
              activePath:'/admin/user',
              activeName:'系统管理',
              title:'用户权限'
            },
            component:()=>import('@/views/system/user/userPermission')
          },
        ]
      },
    ]
  },
  {
    path:'/login',
    name:'login',
    meta:{
      title:'登录'
    },
    component:()=>import('@/views/login')
  },
  {
    path:'*',
    redirect:'/404'
  }
];


const router = new VueRouter({
  mode: "history",
  routes
});

import { LoadingBar } from '../utils/loadingBar';
router.beforeEach((to,from,next) => {
  let userName = localStorage.getItem('userName');
  LoadingBar.start();
  if(to.matched.some( m => m.meta.auth)){
    if(userName) {
      next();
    }else{
      next({path:'/login',query:{ redirect: to.fullPath} });
    }
  }else{
    next();
  }
});

router.afterEach(route => {
  LoadingBar.finish();
});

export default router;
