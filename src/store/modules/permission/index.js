import { fetchList, update } from '@/api/permission/index'

const state = {
  items: []
}
const getters = {
  permissions: (state) => {
    return state.items;
  },
  grantedKeys: (state) => {
    var keys = [];
    state.items.forEach((item, index, array) => {
      keys.push(item.name);
    });
    return keys;
  }
}
const mutations = {
  setItems: (state, items) => {
    state.items = items
  }
}

const actions = {
  update({ commit }, permission) {
    return new Promise((resolve, reject) => {
      update(permission).then(response => {
        commit('setItems', response.groups)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getPermissions({ commit }, provider) {
    fetchList(provider)
      .then(response => {
        commit('setItems', response.groups);
      });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
