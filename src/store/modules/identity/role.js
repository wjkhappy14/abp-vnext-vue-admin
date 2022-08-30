import { getItems, getItem, addItem, updateItem, deleteItem } from '@/api/Identity/role'

const state = {
  items: []
}
const getters = {
  count: (state) => {
    return state.items.count;
  }
}
const mutations = {
  setItems: (state, items) => {
    state.items = items
  },
  sort: (state) => {
    state.items.sort()
  }
}

const actions = {
  addRole({ commit }, role) {
    return new Promise((resolve, reject) => {
      addItem(role).then(r => {
        commit('setItem', r)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateRole({ commit }, role) {
    return new Promise((resolve, reject) => {
      updateItem(role).then(response => {
        commit('setItems', response.items)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getRoles({ commit}) {
    return new Promise((resolve, reject) => {
      getItems().then(response => {
        commit('setItems', response.items)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getItem({ commit, state }) {
    return new Promise((resolve, reject) => {
      getItem().then(item => {
        commit('setItem', item)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteRole({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('setToken', token)
      setToken(token);
      deleteItem();

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
