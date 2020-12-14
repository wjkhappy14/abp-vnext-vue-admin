import { addRole, getRoles, getRole, updateRole, deleteRole } from '@/api/identity/role'

const state = {
  items: []
}
const getters = {
  roles: (state) => {
    return state.items;
  }
}
const mutations = {
  setItems: (state, items) => {
    state.items = items
  }
}

const actions = {
  addRole({ commit }, role) {
    return new Promise((resolve, reject) => {
      addRole(role).then(response => {
        commit('setItems', response.items)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateRole({ commit }, permission) {
    return new Promise((resolve, reject) => {
      updateRole(permission).then(response => {
        commit('setItems', response.items)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getRoles({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRoles().then(response => {
        commit('setItems', response.items)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteRole({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('setToken', token)
      setToken(token)


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
