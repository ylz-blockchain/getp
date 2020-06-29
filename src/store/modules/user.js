import {
  login
} from '@/api/admin/login';
import {
  queryUserByToken
} from '@/api/admin/user';
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth';

const user = {
  state: {
    user: '',
    role: '',
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ROLE: (state, role) => {
      state.role = role;
    },
    SET_USER: (state, user) => {
      state.user = user;
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      commit('SET_TOKEN', '');
      commit('SET_ROLE', '');
      removeToken();
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          setToken(response.token);
          commit('SET_TOKEN', response.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 获取用户信息
    GetUserInfoByToken({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        queryUserByToken().then(response => {
          commit('SET_ROLE', response.roleCode);
          commit('SET_USER', response.realname);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '');
        commit('SET_ROLE', '');
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
