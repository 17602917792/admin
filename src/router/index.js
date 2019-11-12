import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    meta: {
      title: "首页"
    },
    component: () => import('../views/layout'),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "home"
        },
        component: () => import('../views/home'),
      },
      {
        path:"/userRole",
        name:"userRole",
        component:()=>import('../views/admin/userRole'),
        meta: {
          title:"userRole"
        }
      }
    ],
    redirect: "/home"
  },
  {
    path:"/login",
    name:"login",
    component:()=> import('../views/login'),
    meta:{
      title:"登录"
    }
  },
  {
    path: "/",
    redirect: "/home"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
