const getters = {
  token: state => state.user.token,
  role: state => state.user.role,
  user: state => state.user.user,
  permissionRouters: state => state.permission.routers,
  menus: state => state.permission.permissionMenus,
  addRouters: state => state.permission.addRouters
};
export default getters
