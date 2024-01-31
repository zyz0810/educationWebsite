import router from '@/router'
const user = {
  state: {
    activeMenu: '',
    activeSidebarMenu: '',
    activeRouteList: []
  },

  mutations: {
    SET_ROUTE: (state, value) => {
      state.activeMenu = value
    },
    SET_ROUTE_LIST: (state, list) => {
      state.activeRouteList = list
    },
    SET_SIDEBAR_MENU: (state, value) => {
      state.activeSidebarMenu = value
    },
  },

  actions: {
    set_route({
      commit
    }, data) {
      commit('SET_ROUTE', data)
    },
    set_sidebar_menu({
      commit
    }, data) {
      commit('SET_SIDEBAR_MENU', data)
    },
    set_route_List({
      commit
    }, list) {
      commit('SET_ROUTE_LIST', list)
    },
    findActiveMenu({
      commit
    }, route) {
      const {
        path
      } = route;
      const list = path.split("/");
      let str = "";
      if (str.length == 2) {
        this.set_route(str);
        commit('SET_ROUTE', str)
      } else {
        str = `/${list[1]}`;
        commit('SET_ROUTE', str)
      }
    }
  }
}

export default user
