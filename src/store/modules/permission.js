import {
  constantRouterMap,
  supplierRouterMap,
  consumerRouterMap
} from '@/router';

const permission = {
  state: {
    routers: constantRouterMap,
    permissionMenus: undefined,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_PERMISSION_MENUS: (state, permissionMenus) => {
      state.permissionMenus = permissionMenus;
    }
  },
  actions: {
    GenerateRoutes({
      commit,
      state
    }, role) {
      return new Promise(resolve => {
        const accessedRouters = role === 'supplier' ? supplierRouterMap : consumerRouterMap;
        commit('SET_PERMISSION_MENUS', accessedRouters);
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
};

export default permission;
