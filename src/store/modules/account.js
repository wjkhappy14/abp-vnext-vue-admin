import { login, endSession, getMyProfile } from '@/api/account'
import router, { resetRouter } from '@/router'

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
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  setName: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        commit('setToken', response.access_token)
        commit('setName', userInfo.username)
        //setToken(response.access_token)
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
        const users = {
          'admin-token': {
            roles: ['admin'],
            introduction: 'I am a super administrator',
            avatar: 'https://w.wallhaven.cc/full/1j/wallhaven-1j1oqg.jpg',
            name: 'Super Admin'
          },
          'editor-token': {
            roles: ['editor'],
            introduction: 'I am an editor',
            avatar: 'https://w.wallhaven.cc/full/1j/wallhaven-1j1oqg.jpg',
            name: 'Normal Editor'
          }
        }

        const { roles, name, avatar, introduction } = users['admin-token'];

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(users['admin-token'])
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
        commit('SET_ROLES', [])
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

  endSession({ commit }) {
    return new Promise(resolve => {
      endSession().then(() => {
        commit('removeToken', '')
      });
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('setToken', token)
      setToken(token)

      const { roles } = await dispatch('getMyProfile')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

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
