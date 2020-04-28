import { login, logout, getMyProfile } from '@/api/account'
import router, { resetRouter } from '@/router'
import { setToken } from '@/utils/auth'

const state = {
  token: '',
  id: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}
const getters = {
  token: state => state.token,
  avatar: state => state.avatar,
  name: state => state.name,
  roles: state => state.roles,
  introduction: state => state.introduction,
}
const mutations = {
  setToken: (state, token) => {
    state.token = token
  }
}

const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        commit('setToken', response.access_token)
        setToken(response.access_token);
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getMyProfile({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMyProfile().then(response => {
        const { data } = response
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        // commit('setToken', '')
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      // commit('setToken', '')
      // removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
