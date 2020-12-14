import { fetchList, update } from '@/api/IdentityServer/client'

const state = {
  client: {
    items: []
  }
}
const getters = {
  client: (state) => {
    return state.client;
  }
}
const mutations = {
  setClients: (state, items) => {
    state.client.items = items
  }
}

const actions = {
  update({ commit }, permission) {
    return new Promise((resolve, reject) => {
      update(permission).then(response => {
        commit('setItems', response.items)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getClients({ commit }) {
    return new Promise((resolve, reject) => {
      fetchList().then(response => {
        commit('setClients', response)
      }).catch(error => {
        reject(error)
      })
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
