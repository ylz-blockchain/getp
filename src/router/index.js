import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import index from '@/views/layout/index';

export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  }
];

// 运算方路由
export const supplierRouterMap = [
  {
    path: '/index',
    component: index,
    redirect: '/supplier',
    name: '运算方路由',
    children: [
      {
        path: '/supplier',
        name: '首页',
        component: () => import('@/views/supplier/index')
      }
    ]
  }
];

// 需求方路由
export const consumerRouterMap = [
  {
    path: '/index',
    component: index,
    redirect: '/consumer',
    name: '需求方路由',
    children: [
      {
        path: '/consumer',
        name: '首页',
        component: () => import('@/views/consumer/index')
      },
      {
        path: '/consumer/projectManager',
        name: '项目管理',
        component: () => import('@/views/consumer/projectManager')
      }
    ]
  }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRouterMap
});

export default router;
