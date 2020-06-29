import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont';
import store from "./store";
import global from './global';
import ElementUI from 'element-ui';
import echarts from 'echarts';
import axios from 'axios';
import { getToken } from '@/utils/auth';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.prototype.NET = global;
Vue.prototype.$echarts = echarts;
Vue.prototype.$http= axios;

Vue.use(ElementUI);

// 全局路由
const whiteList = ['/login', '/'];// 不重定向白名单
router.beforeEach((to, from, next) => {
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/index' });
    } else {
      if (store.getters.menus === undefined) {
        store.dispatch('GetUserInfoByToken').then(info => { // 拉取user_info
          const role = store.getters.role;
  
          store.dispatch('GenerateRoutes', role).then(() => { // 生成可访问的路由表
            const menus = store.getters.menus
  
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            let flag = false;

            menus[0].children.forEach((item) => {
              if (item.path === to.path) {
                flag = true;
              }
            });

            if (flag) {
              next({ ...to });
            } else {
              next({ path: '/index' });
            }
          })
        }).catch(() => {
          store.dispatch('LogOut').then(() => {
            next({ path: '/login' });
          })
        })
      }

      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath } // 将目的路由地址存入login的query中
      })
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
