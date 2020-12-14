import Cookies from 'js-cookie'

const state = {
  policy: {
    routes: []
  },
  settings: {
    title: 'ABP(VNext)',
    showSettings: true,
    tagsView: {
      cachedViews: [],
      visitedViews: []
    },
    theme: "#11a983",
    fixedHeader: true,
    sidebarLogo: '',
    errorLog: 'production'
  },
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: true
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium'
}
const getters = {
  sidebar: state => state.sidebar,
  size: state => state.size,
  device: state => state.device
}
const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  onVisibilitychange({ }) {
    return Promise.all([console.log(this)]);
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  changeSetting({ }) {


  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
